-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-09-2022 a las 04:53:08
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ebebidas_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brands`
--

CREATE TABLE `brands` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `brands`
--

INSERT INTO `brands` (`id`, `name`) VALUES
(1, 'Budweiser'),
(2, 'Quilmes'),
(3, 'Brahma'),
(4, 'Heineken'),
(5, 'Ipa'),
(6, 'Corona'),
(7, 'Amstel'),
(8, 'Brouwerij'),
(9, 'Wasteiner'),
(10, 'otro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(18) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Cervezas'),
(2, 'Vinos'),
(3, 'Licores'),
(4, 'Whisky'),
(5, 'Vodka'),
(6, 'Ron'),
(7, 'Tequila'),
(8, 'otra');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` bigint(20) UNSIGNED NOT NULL,
  `address` varchar(50) NOT NULL,
  `birthdate` date NOT NULL,
  `city` varchar(50) NOT NULL,
  `province` varchar(50) NOT NULL,
  `cp` int(10) NOT NULL,
  `pass` text NOT NULL,
  `avatar` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clients`
--

INSERT INTO `clients` (`id`, `firstName`, `lastName`, `email`, `phone`, `address`, `birthdate`, `city`, `province`, `cp`, `pass`, `avatar`) VALUES
(7, 'Sergio', 'Sambuelli', 'sergiosambuelli1213456@gmail.com', 1234, 'san', '2020-09-14', 'cordoba', 'cordoba', 5000, '$2a$10$VfEzQP5oo1idvuP..Tu/d.1NRPaydWAzitmtNSHuv7KSXDS.2xVTe', 'userDefault.jpg'),
(8, 'Sergio', 'Sambuelli', 'sergiosambuelli12345@gmail.com', 2147483647, 'san luis 2376', '2000-09-07', 'cordoba', 'cordoba', 5000, '$2a$10$sbBPnblzyWUFAN2c39klp.h6esOr9jZcUgJm/NrCEjQ.nyoiOWasm', 'userDefault.jpg'),
(10, 'Sergio', 'Sambuelli', 'sergiosambuelli2001@gmail.com', 3516665746, 'san luis 2376', '2000-09-14', 'cordoba', 'cordoba', 5000, '$2a$10$h/WN2mggFwwp1SssLR5aEurlbyEo.X0J8a6JULZHbGxbBrntRJ2lm', 'userDefault.jpg'),
(12, 'Sergio', 'Sambuelli', 'sergiosambuelli@gmail.com', 123455, 'san luis 2376', '2001-09-12', 'cordoba', 'cordoba', 5000, '$2a$10$DbbjRvvsWAUPNDCElfadeOI1ATJs0VKJWRDdqLVP8zNLVyOKp/R3K', 'avatar_2.jpg'),
(14, 'ADMIN', 'ADMIN', 'admin@admin.com', 11111, 'san', '2000-09-18', 'cordoba', 'cordoba', 5000, '$2a$10$g6hm0n/tjNj0eh.eXfHAMORdCecaN8Rw7Q6eOb30ppLyVUlZStorG', 'userDefault.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(123) NOT NULL,
  `discount` tinyint(2) NOT NULL,
  `price` decimal(5,2) NOT NULL,
  `offer` varchar(2) NOT NULL,
  `stock` smallint(4) NOT NULL,
  `image` varchar(45) NOT NULL,
  `description` text DEFAULT NULL,
  `brand_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `discount`, `price`, `offer`, `stock`, `image`, `description`, `brand_id`, `category_id`) VALUES
(1, 'Brouwerij', 20, '100.00', 'SI', 20, 'articulo1.jpg', 'Hermosa cerveza rubia oscura con un pronunciado sabor a lúpulo de los lúpulos Cascade y Citra. Una auténtica IPA inglesa.', 8, 1),
(4, 'Amstel', 50, '200.00', 'NO', 20, 'articulo2.jpg', 'Una cerveza hecha con PURA MALTA, suave, refrescante y de calidad, que proviene de las características de su ciudad de origen: AMSTERDAM. El sabor de Amstel deriva del equilibrio entre tradición y modernidad.', 1, 1),
(6, 'Imperial', 40, '300.00', 'NO', 10, 'imperial (1).jpg', 'Con dos lupulos cuidadosamente seleccionados, para encontrar el perfecto equilibrio entre el aroma y el amargor justo.', 5, 1),
(7, 'wastein', 50, '155.00', 'SI', 10, 'wastein.jpg', 'la mejor cerveza', 9, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shoppingcart`
--

CREATE TABLE `shoppingcart` (
  `id` int(11) NOT NULL,
  `items` smallint(4) UNSIGNED DEFAULT NULL,
  `totalPrice` decimal(5,2) UNSIGNED DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shoppingcartproducts`
--

CREATE TABLE `shoppingcartproducts` (
  `id` int(11) NOT NULL,
  `products_id` int(11) DEFAULT NULL,
  `shoppingCart_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_productos_brand_idx` (`brand_id`),
  ADD KEY `fk_products_category1_idx` (`category_id`);

--
-- Indices de la tabla `shoppingcart`
--
ALTER TABLE `shoppingcart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_client_id_idx` (`client_id`);

--
-- Indices de la tabla `shoppingcartproducts`
--
ALTER TABLE `shoppingcartproducts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_products_id_idx` (`products_id`),
  ADD KEY `fk_shoppingCart_id_idx` (`shoppingCart_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `shoppingcart`
--
ALTER TABLE `shoppingcart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `shoppingcart`
--
ALTER TABLE `shoppingcart`
  ADD CONSTRAINT `fk_client_id` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `shoppingcartproducts`
--
ALTER TABLE `shoppingcartproducts`
  ADD CONSTRAINT `fk_products_id` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_shoppingCart_id` FOREIGN KEY (`shoppingCart_id`) REFERENCES `shoppingcart` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
