# Project proposal

* Name: Minkyu SHIM
* Project title: Climb Log
* Pitch (one sentence): A logbook for climbing gyms that lists the routes currently set on each wall and lets climbers record their ascents.
* Target users: Climbers at indoor gyms who want to see what is set, pick their next project and keep track of what they have climbed. No account needed: climbers enter their name when they log an ascent.

## Pages

| URL | Content | Dynamic segment? | Rendering strategy and why |
|---|---|---|---|
| / | List of gyms with their city and number of current routes | No | Static with ISR (`revalidate = 3600`): gyms change rarely, the page must load fast and be indexed, and the route counts can be up to an hour old |
| /gyms/[slug] | One gym: address, description and its current routes, grouped by wall, with grade and colour | Yes (`[slug]`) | SSG with `generateStaticParams` + ISR (`revalidate = 60`): this is the public page people search for ("climbing routes at …"), so the routes must be in the HTML for SEO; new routes appear within a minute |
| /gyms/[slug]/routes/new | Form to add a route to a gym (name, grade, colour, wall) | Yes (`[slug]`) | Static page with a Client Component form that posts to an API route: nothing to fetch on the server, and the form needs state |
| /routes/[id] | One route: details, list of ascents (climber, style, date, comment), form to log an ascent, edit and remove buttons | Yes (`[id]`) | Dynamic (`force-dynamic`): a climber who logs an ascent must see it immediately, and the ascents change all the time |
| /about | What the app is and how grades and ascent styles work | No | Static: content never changes |

## Data

Entities, their main fields, and how they are related:

* **Gym**: `id`, `slug` (unique), `name`, `city`, `address`, `description`
* **Route**: `id`, `gymId`, `name`, `grade` (French scale, e.g. `6a+`), `color`, `wall`, `setAt` (date), `removedAt` (date, empty while the route is on the wall)
* **Ascent**: `id`, `routeId`, `climberName`, `style` (`FLASH`, `REDPOINT` or `ATTEMPT`), `date`, `comment` (optional)

Relations: a **Gym has many Routes** (one-to-many, `Route.gymId`), and a **Route has many Ascents** (one-to-many, `Ascent.routeId`). Deleting a route deletes its ascents.

Gyms are created by a seed script. Routes and ascents are created by users.

## Write actions

What users can create, update or delete:

* **Route**: create (add a route to a gym), update (fix the grade, colour or wall), mark as removed when the gym resets the wall (it then disappears from the gym page), delete
* **Ascent**: create (log an ascent on a route), delete (remove a wrong entry)

Planned API routes for Milestone 2:

* Read: `GET /api/gyms/[slug]/routes`, `GET /api/routes/[id]/ascents`
* Write: `POST /api/gyms/[slug]/routes`, `PATCH /api/routes/[id]`, `DELETE /api/routes/[id]`, `POST /api/routes/[id]/ascents`, `DELETE /api/ascents/[id]`

## Repository

GitHub URL:
