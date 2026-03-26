# Setting Up Admin Subdomain on Vercel

## For Vercel Preview URLs (admin.nanmai-website.vercel.app)

If you're using Vercel's default preview domain, it's even easier! Vercel automatically handles subdomains for their preview/custom domains.

### Steps for Preview URLs:

1. **Just deploy!** The middleware is already configured to handle `admin.*.vercel.app` URLs.

2. **Access your admin panel at:**

   ```
   https://admin.nanmai-website.vercel.app
   ```

   (Replace `nanmai-website` with your actual project name)

3. **Optional: Set environment variable** in Vercel for consistency:
   ```
   NEXT_PUBLIC_ADMIN_SUBDOMAIN=https://admin.nanmai-website.vercel.app
   ```

---

## For Custom Domains (admin.yourdomain.com)

If you're using your own domain, follow these steps:

### Step 1: Configure Domain in Vercel

1. Go to your project on Vercel Dashboard
2. Navigate to **Settings** → **Domains**
3. Add your domain (e.g., `yourdomain.com`)
4. For `www` and root domain, add the appropriate DNS records

### Step 2: Add Admin Subdomain

1. In the same **Domains** section, click **Add**
2. Enter: `admin.yourdomain.com`
3. Click **Add Domain**
4. Vercel will automatically assign it to your project

### Step 3: Configure DNS

Add a CNAME record in your DNS provider:

| Type  | Name  | Value                |
| ----- | ----- | -------------------- |
| CNAME | admin | cname.vercel-dns.com |

Or if using Vercel's DNS:

| Type | Name  | Value       |
| ---- | ----- | ----------- |
| A    | admin | 76.76.21.21 |

### Step 4: Set Environment Variable

In Vercel Dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add a new variable:

```
Name: NEXT_PUBLIC_ADMIN_SUBDOMAIN
Value: https://admin.yourdomain.com
```

Select **Production**, **Preview**, and **Development** environments.

### Step 5: Redeploy

After adding the environment variable, you'll need to redeploy:

1. Go to **Deployments**
2. Click **Redeploy** on your latest deployment
3. Wait for the redeployment to complete

---

## How It Works

The middleware intercepts requests:

| Request URL                       | Middleware Action                              |
| --------------------------------- | ---------------------------------------------- |
| `nanmai-website.vercel.app/admin` | Redirects to `admin.nanmai-website.vercel.app` |
| `admin.nanmai-website.vercel.app` | Rewrites internally to `/admin`                |
| `admin.yourdomain.com/products`   | Rewrites internally to `/admin/products`       |
| `localhost:3000/admin`            | Works normally (no redirect)                   |

## Verification

After setup:

- ✅ `nanmai-website.vercel.app` or `yourdomain.com` → Main website
- ✅ `admin.nanmai-website.vercel.app` or `admin.yourdomain.com` → Admin panel

## Troubleshooting

### "Domain not configured" error

- Make sure DNS records have propagated (can take up to 48 hours)
- Verify the CNAME record is correctly pointing to Vercel

### SSL certificate issues

- Vercel automatically provisions SSL certificates for all domains
- Wait a few minutes after adding the domain for the certificate to be issued

### Middleware not working

- Make sure the environment variable is set correctly
- Check that the middleware matcher pattern isn't excluding your paths
- Verify the domain is properly configured in Vercel
- Clear your browser cache or try incognito mode
