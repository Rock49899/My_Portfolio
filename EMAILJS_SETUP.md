# Configuration EmailJS

## Étapes pour configurer EmailJS :

### 1. Créer un compte EmailJS
- Allez sur https://www.emailjs.com/
- Créez un compte gratuit

### 2. Configurer le service d'email
- Dans le dashboard, allez dans **Email Services**
- Cliquez sur **Add New Service**
- Choisissez votre fournisseur (Gmail, Outlook, etc.)
- Suivez les instructions de connexion
- Notez votre **SERVICE_ID**

### 3. Créer un template d'email
- Allez dans **Email Templates**
- Cliquez sur **Create New Template**
- Utilisez ce template :

```
Nouveau message depuis votre portfolio

De: {{from_name}}
Email: {{from_email}}
Sujet: {{subject}}

Message:
{{message}}
```

- Notez votre **TEMPLATE_ID**

### 4. Obtenir votre clé publique
- Allez dans **Account** > **General**
- Copiez votre **PUBLIC_KEY**

### 5. Créer le fichier de configuration
Créez le fichier `.env.local` à la racine du projet :

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 6. Remplacer les valeurs dans contact.tsx
Les clés sont déjà intégrées dans le code avec `import.meta.env.VITE_EMAILJS_*`

## Notes importantes :
- Ne committez JAMAIS le fichier `.env.local` dans Git
- Pour le déploiement sur Vercel/Netlify, ajoutez ces variables dans les settings du projet
- Limite gratuite : 200 emails/mois
