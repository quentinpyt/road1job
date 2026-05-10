Cours complet : PostgreSQL + ORM + Backend + Frontend
Le plus important en développement moderne n’est pas seulement “écrire du SQL”.
Le vrai sujet est comprendre :


comment le frontend parle au backend


comment le backend parle à la base de données


pourquoi on utilise un ORM


comment tout circule ensemble


Quand tu comprends cette architecture globale, Docker, Prisma, Next.js et PostgreSQL deviennent beaucoup plus logiques.

1. Vision globale d’une application moderne
Imaginons ton projet de job board avec :


Next.js


PostgreSQL


Prisma


Docker


Architecture :
Navigateur    ↓Frontend React / Next.js    ↓API Backend    ↓ORM (Prisma)    ↓PostgreSQL
Chaque couche a un rôle précis.

2. Le frontend
Le frontend = ce que l’utilisateur voit.
Exemple :


boutons


pages


formulaires


dashboard


Avec Next.js :


React affiche l’interface


les composants gèrent l’UI


Exemple :
<button>Create Job</button>
Mais ce bouton ne stocke rien lui-même.
Le frontend ne sauvegarde pas les données importantes.
Il demande au backend de le faire.

3. Pourquoi le frontend ne parle pas directement à PostgreSQL
Question importante.
Pourquoi ne pas connecter React directement à PostgreSQL ?
Parce que :


dangereux


mot de passe DB exposé


sécurité cassée


utilisateur pourrait tout modifier


Donc :
Frontend ❌ PostgreSQL
On ajoute une couche backend.

4. Le backend
Le backend est le “cerveau”.
Il :


valide les données


applique les règles métier


sécurise


parle à la DB


Exemple :
Utilisateur clique "Créer job"↓Frontend envoie requête↓Backend reçoit↓Backend vérifie↓Backend sauvegarde
Dans Next.js moderne :


les API routes


server actions


route handlers


jouent ce rôle backend.

5. Le rôle de PostgreSQL
PostgreSQL stocke les données durablement.
Il est optimisé pour :


lire vite


écrire vite


relations complexes


sécurité


transactions


Il ne connaît PAS React.
Il ne connaît PAS Next.js.
Il connaît seulement :


tables


lignes


colonnes


SQL



6. Les tables
Une table représente un type de donnée.
Exemple :
usersjobsapplicationscompanies

Exemple users
idemailpassword1a@test.comhash2b@test.comhash

7. Les relations
Les relations sont le cœur des bases SQL.
Exemple réel :
1 user→ plusieurs jobs
Donc :
usersjobs
sont liés.

8. Foreign keys
Une foreign key crée une relation.
Exemple :
CREATE TABLE jobs (  id SERIAL PRIMARY KEY,  title TEXT,  user_id INTEGER REFERENCES users(id));
Ici :
user_id
pointe vers :
users.id
Donc chaque job appartient à un user.

9. Pourquoi SQL est puissant
Grâce aux relations, PostgreSQL peut répondre à :
"Tous les jobs de Raphael"
ou :
"Tous les candidats de cette entreprise"
C’est pour ça que SQL domine toujours le backend.

10. Le problème du SQL brut
Écrire du SQL partout devient vite difficile.
Exemple :
SELECT *FROM usersINNER JOIN jobsON users.id = jobs.user_idWHERE users.id = 1;
Quand l’application grandit :


beaucoup de requêtes


beaucoup de bugs


types compliqués


C’est là qu’arrive l’ORM.

11. ORM = pont entre code et DB
ORM signifie :
Object Relational Mapper
L’ORM transforme :


objets JavaScript


↔ tables SQL


Exemple :
const users = await prisma.user.findMany();
Prisma transforme ça en SQL réel.

12. Pourquoi les ORMs existent
Ils apportent :


abstraction


types TypeScript


sécurité


autocomplétion


relations simplifiées


Tu manipules des objets au lieu du SQL brut.

13. Prisma
Prisma est un ORM moderne Node.js.
Très populaire avec :


Next.js


PostgreSQL


TypeScript



14. Prisma Schema
Prisma décrit la DB avec du code.
Exemple :
model User {  id    Int    @id @default(autoincrement())  email String @unique}
Prisma génère ensuite :


SQL


types TS


client JS



15. Migration
Une migration = évolution de la DB.
Exemple :
Ajout colonne username
Prisma crée automatiquement le SQL.
Commande :
npx prisma migrate dev

16. Flux complet d’une requête
Très important.

Étape 1 : frontend
Utilisateur clique :
<button>Create</button>

Étape 2 : requête HTTP
Frontend envoie :
POST /api/jobs
avec des données JSON.

Étape 3 : backend
Next reçoit la requête.

Étape 4 : Prisma
Backend appelle :
await prisma.job.create()

Étape 5 : PostgreSQL
Prisma génère SQL :
INSERT INTO jobs ...

Étape 6 : sauvegarde
PostgreSQL écrit sur disque.

Étape 7 : réponse
Backend répond :
{ "success": true }

Étape 8 : frontend update
React affiche le nouveau job.

17. Docker dans tout ça
Docker standardise l’environnement.
Il permet :


même versions


même PostgreSQL


même Node


même config partout


Architecture :
Container Next.jsContainer PostgreSQL
Ils communiquent via réseau Docker.

18. Pourquoi localhost casse dans Docker
Dans Docker :
localhost = container actuel
Donc :
Next → localhost
cherche PostgreSQL dans le container Next.
Erreur.
Il faut utiliser :
postgres
(le nom du service Docker)

19. Environment variables
Les variables d’environnement connectent les services.
Exemple :
DATABASE_URL=postgresql://admin:secret@postgres:5432/road1job
Cette ligne dit :
username: adminpassword: secrethost: postgresport: 5432database: road1job

20. Le rôle réel du backend moderne
Le backend moderne n’est plus juste :


routes


SQL


Il gère :


auth


sécurité


permissions


cache


validation


fichiers


paiements


queues


emails


websocket



21. Ce qui se passe vraiment dans une app SaaS
Quand tu ouvres une page :
Navigateur↓requête HTTP↓Next.js↓Prisma↓PostgreSQL↓réponse JSON/HTML↓React render
C’est la boucle centrale du web moderne.

22. Pourquoi apprendre PostgreSQL est important
Même avec les ORMs :


SQL reste partout


optimisation


debugging


analytics


joins


performance


Les bons backend engineers comprennent :


SQL


relations


index


transactions


pas seulement Prisma.

23. Les erreurs fréquentes des débutants
Mélanger frontend et backend
Exemple :
mettre du SQL dans React.

Ne pas comprendre les relations
Exemple :
dupliquer les données partout.

Ignorer Docker networking
Exemple :
utiliser localhost.

Ne pas comprendre les migrations
Résultat :
DB cassée.

24. L’évolution normale d’un développeur
Ordre logique :
HTML/CSS↓JavaScript↓React↓Next.js↓API↓PostgreSQL↓ORM↓Docker↓DevOps
Tu es déjà dans les couches avancées.

25. Le point important
Le développement moderne n’est PAS :
“apprendre une techno isolée”.
C’est comprendre :


comment les couches communiquent


comment les données circulent


comment le frontend, backend et DB collaborent


Quand tu vois l’architecture complète :


Docker devient logique


Prisma devient logique


PostgreSQL devient logique


Next.js devient logique.

