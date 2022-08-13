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
    { text: 'Prix', value: 'PrixProduits[0].prix' },
    { text: 'Quantité', value: 'quantite' },
    { text: 'Actions', value: 'actions' }
  ]
}