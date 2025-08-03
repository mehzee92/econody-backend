
const roles = {
  a: "dashboard",
  b: "assets_view",
  c: "assets_create",
  d: "assets_update",
  e: "assets_delete",
  f: "listing_view",
  g: "listing_create",
  h: "listing_update",
  i: "listing_delete",
  j: "offerings_view",
  k: "offerings_create",
  l: "offerings_update",
  m: "offerings_delete",
  n: "fee_view",
  o: "wallet_view",
  p: "wallet_block",
  q: "revenue_distribution_view",
  r: "revenue_distribution_execute",
};

const routeRoleMap = {
  "GET:/api/assets": "assets_view",
  "POST:/api/assets/add": "assets_create",
  "PUT:/api/assets/update": "assets_update",
  "DELETE:/api/assets/delete": "assets_delete",

  "GET:/api/listings": "listing_view",
  "POST:/api/listings/add": "listing_create",
  "PUT:/api/listings/update": "listing_update",
  "DELETE:/api/listings/delete": "listing_delete",

  "GET:/api/offerings": "offerings_view",
  "POST:/api/offerings/add": "offerings_create",
  "PUT:/api/offerings/update": "offerings_update",
  "DELETE:/api/offerings/delete": "offerings_delete",

  "GET:/api/fee": "fee_view",
  
  "GET:/api/wallets": "wallet_view",
  "POST:/api/wallets/block": "wallet_block",
  "GET:/api/revenue": "revenue_distribution_view",
  "POST:/api/revenue/execute": "revenue_distribution_execute",
  "GET:/api/dashboard": "dashboard"
};




function getPermissionKeys(permissions, roles) {
  const resultKeys = [];

  const addRoleKey = (roleValue) => {
    for (const [key, value] of Object.entries(roles)) {
      if (value === roleValue) {
        resultKeys.push(key);
        break;
      }
    }
  };

  if (permissions.dashboard) addRoleKey("dashboard");

  if (permissions.causes) {
    if (permissions.causes.view) addRoleKey("assets_view");
    if (permissions.causes.create) addRoleKey("assets_create");
    if (permissions.causes.update) addRoleKey("assets_update");
    if (permissions.causes.delete) addRoleKey("assets_delete");
  }

  if (permissions.rewards) {
    if (permissions.rewards.topTier?.view) addRoleKey("listing_view");
    if (permissions.rewards.charityLottery?.view) addRoleKey("listing_create");
    if (permissions.rewards.nfts?.view) addRoleKey("listing_update");
    if (permissions.rewards.nfts?.create) addRoleKey("listing_delete");
    if (permissions.rewards.staking?.view) addRoleKey("offerings_view");
  }

  if (permissions.community) {
    const { news, users, administrators } = permissions.community;

    if (news) {
      if (news.view) addRoleKey("offerings_create");
      if (news.create) addRoleKey("offerings_update");
      if (news.update) addRoleKey("offerings_delete");
      // no role for news.delete
    }

    if (users) {
      if (users.view) addRoleKey("wallet_view");
      if (users.blockUnblock) addRoleKey("wallet_block");
    }

    if (administrators) {
      if (administrators.view) addRoleKey("fee_view");
      // other admin permissions not mapped to roles in current roles object
    }
  }

  if (permissions.dappGlobalSettings) {
    if (permissions.dappGlobalSettings.causes) addRoleKey("revenue_distribution_view");
    if (permissions.dappGlobalSettings.rewards) addRoleKey("revenue_distribution_execute");
    // governance and walletsManagement not mapped
  }

  return resultKeys.join(""); // e.g. "abcdefg..."
}








function getPermissionsObject(roleString) {
  const permissions = {
    dashboard: false,
    causes: { view: false, create: false, update: false, delete: false },
    rewards: {
      topTier: { view: false },
      charityLottery: { view: false },
      nfts: { view: false, create: false },
      staking: { view: false },
    },
    community: {
      news: { view: false, create: false, update: false, delete: false },
      users: { view: false, blockUnblock: false },
      administrators: {
        view: false,
        create: false,
        update: false,
        updateOwnAccount: false,
        delete: false,
        createNewQr: false,
      },
    },
    dappGlobalSettings: {
      causes: false,
      governance: false,
      rewards: false,
      walletsManagement: false,
    },
  };

  for (const char of roleString) {
    const permissionKey = roles[char];

    switch (permissionKey) {
      case "dashboard":
        permissions.dashboard = true;
        break;

      // Causes (mapped from assets)
      case "assets_view":
        permissions.causes.view = true;
        break;
      case "assets_create":
        permissions.causes.create = true;
        break;
      case "assets_update":
        permissions.causes.update = true;
        break;
      case "assets_delete":
        permissions.causes.delete = true;
        break;

      // Rewards
      case "listing_view":
        permissions.rewards.topTier.view = true;
        break;
      case "listing_create":
        permissions.rewards.charityLottery.view = true;
        break;
      case "listing_update":
        permissions.rewards.nfts.view = true;
        break;
      case "listing_delete":
        permissions.rewards.nfts.create = true;
        break;
      case "offerings_view":
        permissions.rewards.staking.view = true;
        break;

      // Community > News
      case "offerings_create":
        permissions.community.news.view = true;
        break;
      case "offerings_update":
        permissions.community.news.create = true;
        break;
      case "offerings_delete":
        permissions.community.news.update = true;
        break;

      // Community > Users
      case "wallet_view":
        permissions.community.users.view = true;
        break;
      case "wallet_block":
        permissions.community.users.blockUnblock = true;
        break;

      // Community > Admins
      case "fee_view":
        permissions.community.administrators.view = true;
        break;

      // DApp Global Settings
      case "revenue_distribution_view":
        permissions.dappGlobalSettings.causes = true;
        break;
      case "revenue_distribution_execute":
        permissions.dappGlobalSettings.rewards = true;
        break;

      default:
        // Unused roles can be ignored or logged
        break;
    }
  }

  return permissions;
}




function getRouteSignature(req) {
  const method = req.method.toUpperCase(); // e.g., GET, POST, PUT, DELETE
  const path = req.route?.path || req.path; // fallback in case req.route is undefined
  return `${method}:${path}`;
}




function hasPermission(roleName, roleKeysString) {
  return [...roleKeysString].some(key => roles[key] === roleName);
}


// Middleware 
const authorize = (req, res, next) => {
  const permissionString = req.user.permissions;
  const signature = getRouteSignature(req);
  const requiredRole = routeRoleMap[signature];

  // If no role is mapped, allow access
  if (!requiredRole) {
    return next();
  }

  if (!hasPermission(requiredRole, permissionString)) {
    return res.status(403).json({ status: "error", message: "Access denied: insufficient permission" });
  }
  next(); // user has required permission
};





module.exports = {
  roles,
  routeRoleMap,
  hasPermission,
  getPermissionKeys,
  getPermissionsObject,
  getRouteSignature,
  authorize,
}

