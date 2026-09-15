export type Product = { slug: string; name: string; category: string; gender: string; description: string; image: string; hasColor?: boolean };
export const categories = ["Comuniones", "Cumpleaños temáticos", "Baby shower", "Bautismo", "Navidad", "Otros"];
const image = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;
export const products: Product[] = [
  { slug: "vasos-comunion", name: "Vasos personalizados", category: "Comuniones", gender: "Unisex", description: "Vasos diseñados especialmente para celebrar un día inolvidable.", image: image("photo-1544145945-f90425340c7e"), hasColor: true },
  { slug: "velas-personalizadas", name: "Velas personalizadas", category: "Comuniones", gender: "Unisex", description: "Un detalle cálido con nombre, fecha y diseño a elección.", image: image("photo-1603006905003-be475563bc59"), hasColor: true },
  { slug: "cajita-piramidal", name: "Cajitas piramidales", category: "Bautismo", gender: "Unisex", description: "Cajitas listas para llenar de dulzura y recuerdos.", image: image("photo-1512909006721-3d6018887383"), hasColor: true },
  { slug: "toppers-torta", name: "Toppers para torta", category: "Cumpleaños temáticos", gender: "Unisex", description: "El toque final para que tu torta sea protagonista.", image: image("photo-1578985545062-69928b1d9587") },
  { slug: "banderines", name: "Banderines temáticos", category: "Cumpleaños temáticos", gender: "Niña", description: "Guirnaldas llenas de color para ambientar tu celebración.", image: image("photo-1464349095431-e9a21285b5f3"), hasColor: true },
  { slug: "tubos-golosineros", name: "Tubos golosineros", category: "Baby shower", gender: "Unisex", description: "Souvenirs personalizados que todos quieren llevarse.", image: image("photo-1558636508-e0db3814bd1d"), hasColor: true },
  { slug: "pochocleras", name: "Pochocleras", category: "Baby shower", gender: "Unisex", description: "Presentaciones temáticas para una mesa dulce encantadora.", image: image("photo-1511381939415-e44015466834"), hasColor: true },
  { slug: "cartita-papa-noel", name: "Cartita a Papá Noel", category: "Navidad", gender: "Unisex", description: "Una ilusión personalizada, con sobre y mucho cariño.", image: image("photo-1512909006721-3d6018887383") },
  { slug: "guirnalda-fotos", name: "Guirnaldas con fotos", category: "Otros", gender: "Unisex", description: "Tus recuerdos convertidos en decoración única.", image: image("photo-1513151233558-d860c5398176"), hasColor: true },
  { slug: "cajas-cubo", name: "Cajas cubo", category: "Otros", gender: "Unisex", description: "Una presentación especial para cada ocasión.", image: image("photo-1549465220-1a8b9238cd48"), hasColor: true },
  { slug: "tarjeteria-invitacion", name: "Tarjetería de invitación", category: "Comuniones", gender: "Unisex", description: "Invitaciones que anticipan la magia de tu evento.", image: image("photo-1517841905240-472988babdf9") },
  { slug: "centros-de-mesa", name: "Centros de mesa", category: "Baby shower", gender: "Unisex", description: "Detalles pensados para completar tu ambientación.", image: image("photo-1530103862676-de8c9debad1d"), hasColor: true },
];
export const featuredProducts = products.slice(0, 4);
