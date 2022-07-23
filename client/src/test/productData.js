export default {
  headers: [
    { text: 'ID', value: 'id' },
    {
      text: 'Designation',
      align: 'start',
      sortable: true,
      value: 'designation'
    },
    { text: 'Categorie', value: 'CategorieProduit.designation' },
    { text: 'Prix', value: 'pvu' },
    { text: 'Quantité', value: 'quantite' },
    { text: 'Image', value: 'image' },
    { text: 'Actions', value: 'actions' }
  ]
}