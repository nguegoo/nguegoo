export default {
  headers: [
    { text: 'ID', value: 'id' },
    {
      text: 'Designation',
      align: 'start',
      sortable: true,
      value: 'designation'
    },
    { text: 'Categorie', value: 'SousCategorie.designation' },
    { text: 'Prix', value: 'prix' },
    { text: 'Quantité', value: 'quantite' },
    { text: 'Image', value: 'image' },
    { text: 'Actions', value: 'actions' }
  ]
}