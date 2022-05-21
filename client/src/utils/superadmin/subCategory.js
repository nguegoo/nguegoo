/**
 * Données de gestion des sous catégories
 */
export default {
    /**
     * Données du composant breadcrumb
     */
    breadCrumbItem: [
        {
          text: "Accueil",
          disabled: true,
        },
        {
          text: 'Produits',
          disabled: false,
          to: "/superadmin/product"
        },
        {
          text: "Categories",
          disabled: false,
          to: "/superadmin/product/category",
        },
        {
          text: "Sous catégories",
          disabled: true,
          to: "/superadmin/product/subcategory",
        }
        
    ],
    /**
     * Données du header du tableau pour les sous catégories
     */
    subCategoryHeader: [
        { text: 'ID', value: 'id' },
        { text: 'CATEGORIE', value: 'categorie' },
        { text: 'SOUS CATEGORIE', value: 'designation' },
        { text: 'IMAGE', value: 'image' },
        { text: 'ACTIONS', value: 'actions' }
    ]
}