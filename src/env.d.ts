// Type declarations for Astro locals, adding a CSP nonce to the App.Locals interface.

/// <reference types="astro/client" />
declare namespace App {
  interface Locals {
    cspNonce: string
  }
}
