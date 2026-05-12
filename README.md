# ABG Abogados - Sitio Web

## Deploy en Netlify

1. Crear proyecto en Supabase
2. Ejecutar `supabase-schema.sql` en SQL Editor
3. Crear bucket "images" público en Supabase Storage
4. Subir contenido inicial desde `data/content.json` a la tabla `site_content`
5. Conectar repo a Netlify
6. Agregar estas variables de entorno en Netlify:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
