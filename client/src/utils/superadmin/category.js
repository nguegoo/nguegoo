export default {

  breadCrumb: [
    {
      text: "Accueil",
      disabled: true
    },
    {
      text: "Categories",
      disabled: true,
      to: "/superadmin/product/category"
    },
    {
      text: "Sous catégories",
      disabled: false,
      to: "/superadmin/product/subcategory"
    }
    
  ],
  categoryTabHeader: [
    { text: 'ID', value: 'id' },
    { text: 'DESIGNATION', value: 'designation' },
    { text: 'IMAGE', value: 'images'},
    { text: 'ACTIONS', value: 'actions' }
  ]
}