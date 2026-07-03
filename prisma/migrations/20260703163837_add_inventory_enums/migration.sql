-- Shared enum types referenced by the per-branch inventory tables that
-- BranchesRepository creates dynamically at runtime (one physical table per
-- library, named after its `code`). These types are not modeled in
-- schema.prisma because no Prisma model uses them directly.
CREATE TYPE "item_tipo" AS ENUM ('ITEM', 'LIBRO');

CREATE TYPE "item_estado" AS ENUM ('DISPONIBLE', 'PRESTADO', 'NO_DISPONIBLE');
