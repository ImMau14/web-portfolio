---
title: "CarFix"
date: 2025-04-16
lang: "es"
image: "/projects-images/carfix-mono.webp"
alt: "Imagen de CarFix Mono"
description: "Plataforma e-commerce para repuestos automotrices."
tech: ["react", "tailwind", "javascript", "express", "postgre"]
githubUrl: "https://github.com/bufferring/carfix-mono"
isPublic: true
isFeatured: true
---

# CarFix

CarFix es una plataforma de comercio electrónico para repuestos automotrices diseñada en modo monolítico, preparada para ser separada en capas en el futuro. Soporta roles multi-usuario (Admin, Seller y Customer) y cubre el flujo completo de compra/venta: catálogo, carrito, órdenes, gestión de inventario e imágenes de producto.

La arquitectura combina un frontend moderno con React + Vite + TailwindCSS y un backend en Node.js + Express; la persistencia y el almacenamiento de activos se gestionan con PostgreSQL y Supabase (DB + Storage). Autenticación y seguridad básica con JWT y bcrypt; despliegue previsto en Vercel (frontend) y Render (backend).

Sitio: [CarFix](https://carfixve.app)

> Trabajé en equipo en este proyecto para entregar una app e-commerce completa y funcional. Durante el desarrollo profundicé en integración con Supabase, manejo de imágenes, autenticación con JWT y despliegues en Vercel/Render. El repositorio está pensado como mono-repo listo para evolucionar hacia una arquitectura por capas cuando sea necesario.
