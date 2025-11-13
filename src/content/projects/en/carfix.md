---
title: "CarFix"
date: 2025-04-16
lang: "en"
image: "/projects-images/carfix-mono.webp"
alt: "Image of CarFix Mono"
description: "E-commerce platform for automotive spare parts."
tech: ["react", "tailwind", "javascript", "express", "postgre"]
githubUrl: "https://github.com/bufferring/carfix-mono"
isPublic: true
isFeatured: true
---

# CarFix

CarFix is an e-commerce platform for automotive spare parts designed in a monolithic mode, prepared to be separated into layers in the future. It supports multi-user roles (Admin, Seller, and Customer) and covers the complete buy/sell flow: catalog, cart, orders, inventory management, and product images.

The architecture combines a modern frontend with React + Vite + TailwindCSS and a backend in Node.js + Express; persistence and asset storage are managed with PostgreSQL and Supabase (DB + Storage). Basic authentication and security with JWT and bcrypt; planned deployment on Vercel (frontend) and Render (backend).

Site: [CarFix](https://carfixve.app)

> I worked as part of a team on this project to deliver a complete and functional e-commerce app. During development, I delved into Supabase integration, image handling, JWT authentication, and deployments on Vercel/Render. The repository is designed as a mono-repo ready to evolve into a layered architecture when needed.
