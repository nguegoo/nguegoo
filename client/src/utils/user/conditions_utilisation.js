export default {
    client: {
        title: 'Vente en ligne des produits sur le site nguegoo',
        text: `
            Entreprise <strong>nguegoo</strong> sige en Guinée-Conakry-Matam<br/>
            <strong>Téléphone: </strong>(+224) 628799300<strong> Email: </strong>nguegoo@gmail.com 
            <strong>Numéro Individuel d'Identification Fiscal: </strong>719648180<br/>
            <div>
                <h4>Article 1 - Objet</h4>
                <p>
                    Les présentes conditions régissent les ventes des produits de diverses catégories sur le site https://www.nguegoo.com
                </p>
            </div>
            <div>
            <h4>Article 2 - Données personnelles</h4>
            <p>
                L'entreprise nguegoo se réserve le droit de collecter les informations nominatives
                et les données personnelles vous concernant. <br/>
                Elles sont nécessaires à la gestion de votre compte, votre commande, la livraison
                et ainsi qu'à l'amélioration des services et des informations que nous vous adressons.
            </p>
        </div>
            <div>
                <h4>Article 3 - Prix</h4>
                <p>
                    Les prix des produits sont indiqués en Francs Guinéens(GNF) toutes taxes comprises(TVA
                    et autres taxes applicables au jour de la commande), sauf indication contraire et hors
                    frais de traitement et expédition. <br/>
                    Toutes les commandes, quelque soit leur origine sont payables en GNF. <br/>
                    <strong>Attention: </strong>dès que vous prenez physiquement des produits commandés,
                    les risques de perte ou d'endomagement vous sont transférés.
                </p>
            </div>
            <div>
                <h4>Article 4 - Validation de votre commande</h4>
                <p>
                    Toutes commandes se trouvant sur nguegoo suppose l'adhésion aux présentes
                    conditions générales. Toute confirmation de commande etraîne votre adhésion pleine
                    et entière aux présentes conditions générales de vente, sans exception ni réserve.<br/>
                    L'ensemble des données fournies et la confirmation enregistrée vaudront preuve de la transaction. <br/>
                    Vous déclarez en avoir parfaite connaissance. La confirmation de commande vaudra signature et
                    acception des opérations effectuées.<br/>
                    Un récaputilatif des informations de votre commande et des présentes condition vous sera communiqué
                    via votre compte utilisateur. Il sera imprimable en PDF.
                </p>
            </div>
            <div>
                <h4>Article 5 - Paiement</h4>
                <p>
                    Le fait de valider votre commande implique pour vous l'obligation de payer le prix iniqué<br/>
                    Le réglement de vos achats s'effectue par Orange Money(OM), Mobile Money(MoMo) ou par carte
                    bancaire grâce à un système sécurisé selon votre choix.
                </p>
            </div>
            <div>
                <h4>Article 6 - Livraison</h4>
                <p>
                    Les produits sont livrés à l'adresse indiquée au cours du processus de commande,
                    dans le délai indiqué sur la page de validation de la commande.<br/>
                    En cas de retard d'expédition, un mail vous sera adressé pour vous informer d'une
                    éventuelle conséquence sur le délai de livraison qui vous sera indiqué.<br/>
                    Conformément aux dispositions légales, en cas de retard de livraison, vous avez la possibilité
                    d'annuler la commande dans les conditions et modalités définies.
                </p>
            </div>
        `
    },
    vendeur: {
        title: 'Mise en ligne des produits sur le site nguegoo',
        text: `
            Entreprise <strong>nguegoo</strong> siège en Guinée-Conakry-Matoto<br/>
            <strong>Téléphone: </strong>(+224) 621141417<strong> Email: </strong>center.nguegoo@gmail.com 
            <strong>Numéro Individuel d'Identification Fiscal: </strong>00125698.<br/>
            <div>
                <h4>Article 1 - Objet</h4>
                <p>
                    Les présentes conditions régissent la mise en ligne des produits sur le site nguegoo.com.
                </p>
            </div>
            <div>
            <h4>Article 2 - Données personnelles</h4>
            <p>
                L'entreprise nguegoo se réserve le droit de collecter les informations nominatives
                et les données personnelles vous concernant. <br/>
                Elles sont nécessaires à la gestion de votre compte, vos ventes,
                et ainsi qu'à l'amélioration des services et des informations que nous vous adressons.
            </p>
        </div>
            <div>
                <h4>Article 3 - Définition de vos prix de vente</h4>
                <p>
                    Les prix des produits sont indiqués en Francs Guinéens(GNF) toutes taxes comprises. <br/>
                    Vous avez la liberté de définir vos prix tout en vous basant sur les règles établies
                    par le ministère de commerce, et le taux d'imposition définie par le site nguegoo(voir article 4). <br/>
                </p>
            </div>
            <div>
                <h4>Article 4 - Taux d'imposition sur les achats</h4>
                <p>
                   Conformément à la politique commerciale du site nguegoo, il est imputé un taux de <strong>10%</strong>  sur chaque
                   produit achété.
                </p>
            </div>
            <div>
                <h4>Article 5 - Paiement</h4>
                <p>
                    Le réglement des achats de vos produits s'effectue par Orange Money(OM), Mobile Money(MoMo) ou par carte
                    bancaire grâce à un système sécurisé selon votre choix.
                </p>
            </div>
            <div>
                <h4>Article 6 - Droits</h4>
                <p>
                   La création d'un compte vendeur vous confère les droits d'accès à un espace
                   d'administration vous permettant de gérer librement vos produits sur la plate-forme.<br/>
                </p>
            </div>
        `
    },
    setCondition(type, compte) {
        if (type == 'client') {
            compte.conditionTitle = this.client.title
            compte.conditionText = this.client.text
        } else {
            compte.conditionTitle = this.vendeur.title
            compte.conditionText = this.vendeur.text
        }
    }
}