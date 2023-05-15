# Workbox


## 1) liste des fonctionnalités offertes
Workbox offre diverses fonctionnalités :
- workbox-build : 
- workbox-routing : comme un service worker peut intercepter les requêtes pour une page, il peut répondre au navigateur avec le contenu venant du cache, du réseau ou de celui qui est crée par le service worker. Ce module permet de facilement router ces requêtes
- workbox-strategies : Un large choix de stratégie de mise en cache 
- workbox-precaching : Enregistrer des assets durant l'installation du service worker. Sert aux développeur à manipuler et gérer le cache. Surtout utilisé pour les applications hors ligne
- workbox-expiration : Pour mettre des restrictions sur le cache, surtout sur la durée durant laquelle les assets peuvent être enregistrés.
- workbox-window : Sert surtout aux développeurs pour accéder au cache depuis la page web. Permet d'identifier les moments et points clés d'un service worker dans son cycle de vie.

## 2) Méthodes de cache et les utilisations possibles

- stale-while-revalidate : répondre à la requête avec le contenu du cache s'il existe, si la réponse n'est pas dans le cache on passe par le réseau. La réponse venant du réseau va alors mettre à jour le cache. Cette stratégie est viable s'il n'est pas nécessaire d'avoirs les données les plus récentes.
- cache first : Pour les web app hors ligne qui ont majoritairement besoin du cache surtout pour des assets qui ne sont pas régulièrement mis à jour. Si la réponse à la requête existe dans le cache, le réseau ne sera pas utilisé. À l'inverse, la réponse du réseau servira à mettre à jour le cache pour la prochaine requête.
- Network First : Pour des requêtes qui se mettent à jour de façon régulière, cette stratégie va d'abord chercher la dernière réponse venant du réseau et la mettre dans le cache. Si la réponse venant du réseau ne fonctionne pas, la réponse du cache sera utilisé.
- Network Only : la réponse de la requête vient uniquement du réseau et ne touche pas au cache.
- Cache Only : Pas courante mais utilisable si on utilise notre propre méthode de pre-caching, les réponses viennent uniquement du cache.

## 3) uses cases intéressants dans l'application de suivi de vélo : Track my bike.

Le fait de pouvoir choisir comment sont fait les requêtes peut être intéressant dans plusieurs cas.
Par exemple si l'utilisateur n'a plus de réseau il peut avoir accès à la dernière réponse qui lui a été envoyé et ce grâce au cache. Il n'aura pas accès à la toute dernière position du vélo mais aura malgré tout une information.



