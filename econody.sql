-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 23, 2025 at 03:57 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `econody`
--

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE `assets` (
  `id` int(11) NOT NULL,
  `asset_name` varchar(100) NOT NULL,
  `token_symbol` varchar(20) NOT NULL,
  `token_icon` varchar(200) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `thumbnail` varchar(200) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `total_supply` bigint(20) UNSIGNED NOT NULL,
  `decimals` int(11) DEFAULT 18,
  `token_standard` varchar(20) DEFAULT 'ERC20',
  `blockchain` varchar(50) DEFAULT 'Ethereum',
  `token_address` varchar(100) DEFAULT NULL,
  `contract_type` varchar(50) DEFAULT NULL,
  `destination_wallet` varchar(100) NOT NULL,
  `legal_owner` varchar(255) DEFAULT NULL,
  `issuer_entity` varchar(255) DEFAULT NULL,
  `compliance_status` varchar(50) DEFAULT 'pending',
  `country_of_asset` varchar(100) DEFAULT NULL,
  `jurisdiction` varchar(100) DEFAULT NULL,
  `category` varchar(200) NOT NULL,
  `valuation` decimal(20,4) DEFAULT NULL,
  `currency` varchar(10) DEFAULT 'USD',
  `expected_yield_percent` decimal(5,2) DEFAULT NULL,
  `offering_type` varchar(50) DEFAULT NULL,
  `offering_start_date` date DEFAULT NULL,
  `offering_end_date` date DEFAULT NULL,
  `is_fractionalized` tinyint(1) DEFAULT 1,
  `deployed_by` varchar(100) DEFAULT NULL,
  `deployment_tx_hash` varchar(100) DEFAULT NULL,
  `explorer_url` varchar(255) DEFAULT NULL,
  `progress` double NOT NULL,
  `investors` int(11) NOT NULL DEFAULT 0,
  `revenue_distribution` varchar(200) DEFAULT NULL,
  `tokenization_whitepaper` varchar(150) DEFAULT NULL,
  `buyback_policy` varchar(200) DEFAULT NULL,
  `ownership_declaration` varchar(150) DEFAULT NULL,
  `ddl_agreement` varchar(150) DEFAULT NULL,
  `apr` double NOT NULL DEFAULT 0,
  `listed_quantity` int(11) NOT NULL DEFAULT 0,
  `is_listed` tinyint(1) NOT NULL DEFAULT 0,
  `tags` varchar(300) DEFAULT NULL,
  `status` varchar(10) DEFAULT 'init',
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `modified_on` datetime DEFAULT NULL,
  `asset_location` varchar(200) DEFAULT NULL,
  `asset_address` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`id`, `asset_name`, `token_symbol`, `token_icon`, `title`, `thumbnail`, `description`, `total_supply`, `decimals`, `token_standard`, `blockchain`, `token_address`, `contract_type`, `destination_wallet`, `legal_owner`, `issuer_entity`, `compliance_status`, `country_of_asset`, `jurisdiction`, `category`, `valuation`, `currency`, `expected_yield_percent`, `offering_type`, `offering_start_date`, `offering_end_date`, `is_fractionalized`, `deployed_by`, `deployment_tx_hash`, `explorer_url`, `progress`, `investors`, `revenue_distribution`, `tokenization_whitepaper`, `buyback_policy`, `ownership_declaration`, `ddl_agreement`, `apr`, `listed_quantity`, `is_listed`, `tags`, `status`, `created_by`, `modified_by`, `created_on`, `modified_on`, `asset_location`, `asset_address`) VALUES
(16, 'Econody Asset Token', 'EAT', 'fmdehhwny-43730136bnb.png', 'An invovative Startup', 'fmdehiks6-building7.jpeg', 'some details are here. \nsome more details here. ', 345000, 18, 'ERC20', 'Ethereum', '0x374375328437437537437554598347598347', NULL, '0x34759834387532573493944759834', NULL, NULL, 'pending', NULL, NULL, 'Crypto Coin', 25000.0000, '$', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 23, 12, '1752951052190-econody-ui-v0.pdf', NULL, NULL, '', '0', 6, 0, 1, 'Crypto, Token, Startup', 'active', 0, NULL, '2025-07-17 17:19:43', NULL, NULL, NULL),
(18, 'Gold Pegged Token', 'GPT', '1753125887572-building4.png', 'A Gold backed Token', '1753126947642-building4.png', 'some details are here. \r\nsome more details here. ', 345000, 18, 'ERC20', 'Ethereum', '0x374375328437437537437554598347598347', NULL, '0x34759834387532573493944759834', NULL, NULL, 'pending', NULL, NULL, 'Crypto Coin', 1600.0000, '$', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 45, 56, '1752951052190-econody-ui-v0.pdf', NULL, NULL, '', '0', 12, 0, 1, 'Crypto, Token, Gold', 'active', 0, NULL, '2025-07-19 02:19:43', NULL, NULL, NULL),
(19, 'Silver Pegged Token', 'SPT', '1753125900903-building6.jpg', 'Silver Reserved Token by a reputed company', '1753126934957-building2.jpeg', 'some details are here. \r\nsome more details here. ', 345000, 18, 'ERC20', 'Ethereum', '0x374375328437437537437554598347598347', NULL, '0x34759834387532573493944759834', NULL, NULL, 'pending', NULL, NULL, 'Crypto Coin', 23000.0000, '$', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 78, 700, 'fmdext0zg-econodyuiv0.pdf', 'fmdexsn8k-nwhitepaper.pdf', 'fmdext4is-6dollarpepe.pdf', 'fmdexsqt1-5dollarpepe.pdf', 'fmdexsunr-6dollarpepe.pdf', 10, 0, 1, 'Crypto, Token, Silver', 'active', 0, NULL, '2025-07-18 04:19:43', NULL, NULL, NULL),
(20, 'VIP Benglow Token', 'VBT', '1753125857919-building2.jpeg', 'Two Story Apartment Benglow Style Building ff', '1753126919392-building1.jpg', 'some details are here. \r\nsome more details here. ', 345000, 18, 'ERC20', 'Ethereum', '0x374375328437437537437554598347598347', NULL, '0x34759834387532573493944759834', NULL, NULL, 'pending', NULL, NULL, 'Real Estate', 210000.0000, '$', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 90, 450, '1752951052190-econody-ui-v0.pdf', NULL, NULL, '', '0', 9, 0, 1, 'House, Property', 'active', 0, NULL, '2025-07-17 22:49:43', NULL, NULL, NULL),
(21, 'PEPE Token', 'TA', 'fmdebls4n-2building5.jpeg', 'A successful token and a high MC.   A successful token and a high MC.   A successful token and a high MC.   A successful token and a high MC.   A successful token and a high MC.   A successful token a', '1753128804301-1753128345444-1753127570035-pepe.png', 'A successful token and a high MC.   A successful token and a high MC.   A successful token and a high MC.   A successful token and a high MC.   A successful token and a high MC.   A successful token and a high MC.   A successful token and a high MC.   A successful token and a high MC.   A successful token and a high MC.   A successful token and a high MC.   A successful token and a high MC.   A successful token and a high MC.   A successful token and a high MC.   A successful token and a high MC.   ', 345000, 18, 'ERC20', 'Ethereum', NULL, NULL, '0x34759834387532573493944759834', NULL, NULL, 'pending', NULL, NULL, 'Crypto Coin', NULL, 'USD', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 0, 0, 'fmdebk5i6-1dollarpepe.pdf', NULL, NULL, '', '0', 0, 0, 1, NULL, 'active', 0, NULL, '2025-07-20 05:44:11', NULL, NULL, NULL),
(22, 'Test Assets Token', 'TAT', '1753166715739-1752943730136-bnb.png', 'Test assets to be shown there.  Test assets to be shown there.  Test assets to be shown there.  ', '1753166721349-1752905503361-feature-image.png', 'Test assets to be shown there.  Test assets to be shown there.  Test assets to be shown there.  Test assets to be shown there.  Test assets to be shown there.  Test assets to be shown there.  ', 1200, 18, 'ERC20', 'Ethereum', NULL, NULL, '0x34759834387532573493944759834', 'Legal Owner', 'issuer entity', 'pending', NULL, 'Lithuania', 'Crypto Coin', NULL, 'USD', NULL, NULL, NULL, NULL, 1, NULL, NULL, 'token explorer url', 0, 0, 'fmdetknbf-nwhitepaper.pdf', 'fmdetk355-3dollarpepe.pdf', 'fmdetkdlj-6dollarpepe.pdf', 'fmdetk69h-6dollarpepe.pdf', 'fmdetkac8-econodyuiv0.pdf', 0, 0, 0, 'TAT, Token, Digital Asset', 'active', 0, NULL, '2025-07-15 20:45:55', NULL, NULL, NULL),
(23, 'Test Test Test', 'TA', 'fmdednej7-eatureimage.png', 'some tile', 'fmdehj73t-7570035pepe.png', 'adsadfsad sadfsadf', 345000, 18, 'ERC20', 'Ethereum', NULL, NULL, '0x34759834387532573493944759834', NULL, NULL, 'pending', NULL, NULL, 'Crypto Coin', NULL, 'USD', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 0, 0, 'fmdeecs73-econodyuiv0.pdf', 'fmdeecfnf-nwhitepaper.pdf', 'fmdeomqsf-1dollarpepe.pdf', 'fmdeecjwl-1dollarpepe.pdf', 'fmdeomy9h-5dollarpepe.pdf', 0, 0, 0, NULL, 'active', 0, NULL, '2025-07-21 01:14:08', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `status` varchar(10) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `icon`, `status`) VALUES
(2, 'Ali Khan', 'test4.png', 'disable'),
(3, 'Real Estate', 'test.svg', '1'),
(5, 'Building', 'test23.svg', 'active'),
(6, 'Commercial', 'test23.svg', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `holdings`
--

CREATE TABLE `holdings` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `asset_id` int(11) DEFAULT NULL,
  `amount_held` decimal(30,10) NOT NULL DEFAULT 0.0000000000,
  `bought_price` double NOT NULL DEFAULT 0,
  `current_price` double NOT NULL DEFAULT 0,
  `revenue_generated` double DEFAULT 0,
  `status` varchar(10) DEFAULT 'active',
  `asset_metadata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`asset_metadata`)),
  `created_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `modified_by` varchar(200) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `holdings`
--

INSERT INTO `holdings` (`id`, `username`, `asset_id`, `amount_held`, `bought_price`, `current_price`, `revenue_generated`, `status`, `asset_metadata`, `created_by`, `created_on`, `modified_by`, `modified_on`) VALUES
(1, 'admin', 19, 12300.5442300000, 12.32, 15.773, 4, 'active', '{\"name\":\"Silver Pegged Token\", \"thumbnail\":\"fmdehiks6-building7.jpeg\", \"category\":\"Crypto Coin\"}', NULL, '2025-07-23 01:25:07', NULL, NULL),
(2, 'admin', 18, 75000.5442300000, 120.32, 235.773, 45, 'active', '{\"name\":\"Gold Pegged Token\", \"thumbnail\":\"fmdednej7-eatureimage.png\", \"category\":\"Crypto Coin\"}', NULL, '2025-07-23 01:25:07', NULL, NULL),
(3, 'admin', 20, 75000.5442300000, 120.32, 235.773, 45, 'active', '{\"name\":\"Gold Pegged Token\", \"thumbnail\":\"fmdednej7-eatureimage.png\", \"category\":\"Crypto Coin\"}', NULL, '2025-07-23 01:25:07', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `listings`
--

CREATE TABLE `listings` (
  `id` int(11) NOT NULL,
  `asset_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `seller_name` varchar(200) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` double NOT NULL,
  `cliff` varchar(200) NOT NULL,
  `status` varchar(10) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `listings`
--

INSERT INTO `listings` (`id`, `asset_id`, `seller_id`, `seller_name`, `quantity`, `total_price`, `cliff`, `status`, `modified_by`, `modified_on`, `created_by`, `created_on`) VALUES
(1, 18, 12003, 'admin', 12300, 123, 'No Cliff', 'active', NULL, NULL, NULL, '2025-07-21 23:30:25'),
(2, 16, 12004, 'admin2', 2300, 123, 'No Cliff', 'active', NULL, NULL, NULL, '2025-07-21 23:30:25'),
(3, 18, 12003, 'admin', 12300, 123, 'No Cliff', 'active', NULL, NULL, NULL, '2025-07-21 23:30:25');

-- --------------------------------------------------------

--
-- Table structure for table `offerings`
--

CREATE TABLE `offerings` (
  `id` int(11) NOT NULL,
  `asset_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stakings`
--

CREATE TABLE `stakings` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `staker_wallet` varchar(255) NOT NULL,
  `asset_id` int(11) NOT NULL,
  `token_address` varchar(255) NOT NULL,
  `staked_amount` decimal(30,10) NOT NULL DEFAULT 0.0000000000,
  `staking_start` datetime DEFAULT current_timestamp(),
  `staking_end` datetime DEFAULT NULL,
  `last_updated` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` varchar(5) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `staking_records`
--

CREATE TABLE `staking_records` (
  `id` int(11) NOT NULL,
  `user_wallet` varchar(255) NOT NULL,
  `token_address` varchar(255) NOT NULL,
  `staked_amount` decimal(30,10) NOT NULL,
  `staking_package` varchar(100) DEFAULT NULL,
  `staking_start` datetime NOT NULL,
  `staking_end` datetime NOT NULL,
  `reward_rate_percent` decimal(5,2) DEFAULT NULL,
  `reward_amount` decimal(30,10) DEFAULT 0.0000000000,
  `claimed_rewards` decimal(30,10) DEFAULT 0.0000000000,
  `status` enum('active','completed','cancelled') DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `uploads`
--

CREATE TABLE `uploads` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(200) NOT NULL,
  `type` varchar(40) NOT NULL,
  `asset_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(160) DEFAULT NULL,
  `pwd` varchar(120) DEFAULT NULL,
  `salt` varchar(160) DEFAULT NULL,
  `access_pin` varchar(10) DEFAULT NULL,
  `authenticatorApp` varchar(50) DEFAULT NULL,
  `totp_secret` varchar(60) DEFAULT NULL,
  `totp_qr` varchar(5000) DEFAULT NULL,
  `refreshToken` varchar(500) DEFAULT NULL,
  `nonce` varchar(300) NOT NULL,
  `role` varchar(52) DEFAULT 'user',
  `permissions` varchar(52) DEFAULT NULL,
  `wallet` varchar(45) DEFAULT NULL,
  `balance` bigint(20) DEFAULT NULL,
  `transactions` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `registration` datetime DEFAULT current_timestamp(),
  `last_login` datetime DEFAULT NULL,
  `last_transactions` date DEFAULT NULL,
  `last_ip` varchar(15) NOT NULL,
  `status` char(1) DEFAULT NULL,
  `created_by` varchar(30) DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `email`, `phone`, `password`, `pwd`, `salt`, `access_pin`, `authenticatorApp`, `totp_secret`, `totp_qr`, `refreshToken`, `nonce`, `role`, `permissions`, `wallet`, `balance`, `transactions`, `image`, `registration`, `last_login`, `last_transactions`, `last_ip`, `status`, `created_by`, `created_on`) VALUES
(12003, 'admin', 'Ahmed', 'mehzee92@gmail.com', '031245678', '$2b$10$MBzfHHprDtPlPkPzLDyHMOQMJN73gkl/g/Y2uTIWk2aMe8iv/pY0m', 'passpass', '$2b$10$MBzfHHprDtPlPkPzLDyHMO', '4486', 'Google Authenticator', 'JVNDIUTLMYHDY2KE', 'data:image/png;base64,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', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIwMDMsImlhdCI6MTc1MzE2NjQ3NCwiZXhwIjoxNzU1NzU4NDc0fQ.j3_RW_wxXRDXbC0-HiEUFcmlsWPXLcMaLG7659eNblg', '', 'admin', 'abcdefghijklmnopqrstuvwxyz', NULL, NULL, NULL, NULL, '2025-07-14 00:00:00', NULL, NULL, '::1', NULL, NULL, '2025-07-14 05:51:46'),
(12004, 'admin2', 'Ali Khan Khilji', 'alikhan@gmail.com', '0123456', '$2b$10$8eRua0CAR3ZKHYhE0XGRCOGiSDQsO1B3eyIHQjMUwAqITP9SIjCm6', 'passpass', '$2b$10$8eRua0CAR3ZKHYhE0XGRCO', '1122', 'Google Authenticator', 'OQDTGQAYB5ESYT25', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANQAAADUCAYAAADk3g0YAAAAAklEQVR4AewaftIAAAqNSURBVO3BQY4YybLgQDJR978yR0tfBZDIKL3WHzezP1hrXfGw1rrmYa11zcNa65qHtdY1D2utax7WWtc8rLWueVhrXfOw1rrmYa11zcNa65qHtdY1D2utax7WWtc8rLWu+eEjlb+pYlJ5o+INlaniDZUvKn6TylQxqUwVN6lMFZPK31TxxcNa65qHtdY1D2uta364rOImlTcqJpVJ5Y2KLyomlZOKSWWqOFE5qThReUNlqjhRmSreqLhJ5aaHtdY1D2utax7WWtf88MtU3qh4o2JSmSomlaliUplUpoovKr5QmSpOKiaVk4oTlROVqeI3qbxR8Zse1lrXPKy1rnlYa13zwz9O5Y2KNyomlZOKSWWqmFSmiqnipoovKiaVL1Smin/Zw1rrmoe11jUPa61rfvjHVZyoTBX/ZSpfVEwqU8XfpPL/k4e11jUPa61rHtZa1/zwyyr+S1SmiqnijYpJ5UTlpOINlZOKSeWkYlKZKt6o+E0V/yUPa61rHtZa1zysta754TKVv0llqjipmFSmikllqphUpopJZaqYVE5Upoo3VKaKSeWmikllqphUpooTlf+yh7XWNQ9rrWse1lrX/PBRxb9E5UTlROVE5aaKm1ROVKaKSWWqmFROVN6o+Jc8rLWueVhrXfOw1rrG/uADlaliUjmpmFTeqHhDZaqYVN6omFROKiaV31QxqfxNFZPKVHGiMlWcqEwVk8pJxRcPa61rHtZa1zysta754T+uYlI5UXlD5aRiUplUpopJZVI5qThROal4o+ImlZOKE5Wp4guVv+lhrXXNw1rrmoe11jX2BxepnFRMKlPFpDJVTConFV+onFS8oXJTxaQyVXyh8kbFpPJFxaQyVZyovFHxxcNa65qHtdY1D2uta374ZRUnFScVk8pUMalMKicVb1RMKicVJxVvqNykMlVMFScqk8pUMamcVEwqb6hMFScqNz2sta55WGtd87DWuuaHyyomlaliUpkqJpWp4qTiRGVSualiUvlCZaqYVKaKSWWqeEPlpOKNijcqJpWTihOV3/Sw1rrmYa11zcNa65ofPlJ5Q2WqmFSmihOVk4qpYlL5myomlZtUvlD5L1E5UTmpmCp+08Na65qHtdY1D2uta374qGJS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', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIwMDQsImlhdCI6MTc1MjU5NDE2OSwiZXhwIjoxNzU1MTg2MTY5fQ.F3I_cumjPxiZq-jKTLts-c4x3Vhrd2925V9GLxyQIy4', '', 'admin', 'abcdefghijklmno', NULL, NULL, NULL, NULL, '2025-07-14 00:00:00', NULL, NULL, '::1', NULL, NULL, '2025-07-14 06:53:30'),
(12010, 'admin3', 'Habib Ullah', 'habib2233@gmail.com', '0232344434', '$2b$10$qHu0k2l22zU3VMMpx1MldesCXoYZ3c4uGsAUJ58yXsaG8Yrskz16y', 'passpass', '$2b$10$qHu0k2l22zU3VMMpx1Mlde', '1144', 'Google Authenticator', 'B5XWQ3THLJFTGZJB', 'data:image/png;base64,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', NULL, '', 'admin', '\"abcdefgh\"', NULL, NULL, NULL, NULL, '2025-07-15 21:11:49', NULL, NULL, '', NULL, NULL, '2025-07-15 10:11:49'),
(12011, 'nadir', 'Nadir Ali Khan', 'development@charcoin.org', '03042019543', '$2b$10$IiZO8OI/LDAmKfdxkxYr4O.uoWwBgD7yrcVkDVRhon31zLI1pxfDy', 'nadir313', '$2b$10$IiZO8OI/LDAmKfdxkxYr4O', '3135', 'Google Authenticator', 'HERVYGCRPUBX2U2M', 'data:image/png;base64,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', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIwMTEsImlhdCI6MTc1MjYxMTY2NSwiZXhwIjoxNzU1MjAzNjY1fQ.r7UwThlX2NnyFU5nK0HqDO1lxTc29yaat2wX8cpjX10', '', 'admin', '\"akq\"', NULL, NULL, NULL, NULL, '2025-07-16 01:57:08', NULL, NULL, '::1', NULL, NULL, '2025-07-15 14:57:08'),
(12012, 'user_1752828170974', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIwMTIsImlhdCI6MTc1Mjg2MDk0OCwiZXhwIjoxNzU1NDUyOTQ4fQ.Jt3dteefmJQTyMYeTNChxisFCwcGrg4ATGZaSABznKw', 'Login request At : 2025-07-18T17:49:02.084Z By : A7rqWKWCo6ykAcFQcu7oeqVm18YgP3jmwCdc5F7iVEiT', 'user', NULL, 'A7rqWKWCo6ykAcFQcu7oeqVm18YgP3jmwCdc5F7iVEiT', NULL, NULL, NULL, '2025-07-18 14:12:50', NULL, NULL, '', NULL, NULL, '2025-07-18 03:12:50');

-- --------------------------------------------------------

--
-- Table structure for table `vesting_events`
--

CREATE TABLE `vesting_events` (
  `id` int(11) NOT NULL,
  `vesting_schedule_id` int(11) NOT NULL,
  `release_date` datetime NOT NULL,
  `amount` bigint(20) NOT NULL,
  `tx_hash` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `status` varchar(5) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `modified_by` int(11) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vesting_schedules`
--

CREATE TABLE `vesting_schedules` (
  `id` int(11) NOT NULL,
  `wallet_address` varchar(100) NOT NULL,
  `token_address` varchar(100) NOT NULL,
  `total_allocated` bigint(20) NOT NULL,
  `start_date` datetime NOT NULL,
  `cliff_duration_days` int(11) DEFAULT 0,
  `vesting_duration_days` int(11) NOT NULL,
  `vesting_interval_days` int(11) DEFAULT 30,
  `tokens_released` bigint(20) DEFAULT 0,
  `last_release_date` datetime DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` varchar(5) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `modified_by` int(11) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `holdings`
--
ALTER TABLE `holdings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `asset_id` (`asset_id`);

--
-- Indexes for table `listings`
--
ALTER TABLE `listings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `asset_id` (`asset_id`);

--
-- Indexes for table `offerings`
--
ALTER TABLE `offerings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stakings`
--
ALTER TABLE `stakings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `asset_id` (`asset_id`);

--
-- Indexes for table `staking_records`
--
ALTER TABLE `staking_records`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `uploads`
--
ALTER TABLE `uploads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vesting_events`
--
ALTER TABLE `vesting_events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vesting_event_schedule` (`vesting_schedule_id`);

--
-- Indexes for table `vesting_schedules`
--
ALTER TABLE `vesting_schedules`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assets`
--
ALTER TABLE `assets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `holdings`
--
ALTER TABLE `holdings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `listings`
--
ALTER TABLE `listings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `offerings`
--
ALTER TABLE `offerings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stakings`
--
ALTER TABLE `stakings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staking_records`
--
ALTER TABLE `staking_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `uploads`
--
ALTER TABLE `uploads`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12013;

--
-- AUTO_INCREMENT for table `vesting_events`
--
ALTER TABLE `vesting_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vesting_schedules`
--
ALTER TABLE `vesting_schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `holdings`
--
ALTER TABLE `holdings`
  ADD CONSTRAINT `holdings_ibfk_1` FOREIGN KEY (`asset_id`) REFERENCES `assets` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `listings`
--
ALTER TABLE `listings`
  ADD CONSTRAINT `fk_marketplace_asset` FOREIGN KEY (`asset_id`) REFERENCES `assets` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `stakings`
--
ALTER TABLE `stakings`
  ADD CONSTRAINT `stakings_ibfk_1` FOREIGN KEY (`asset_id`) REFERENCES `assets` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vesting_events`
--
ALTER TABLE `vesting_events`
  ADD CONSTRAINT `fk_vesting_event_schedule` FOREIGN KEY (`vesting_schedule_id`) REFERENCES `vesting_schedules` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
