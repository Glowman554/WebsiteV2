// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_joke from "./routes/api/joke.ts";
import * as $api_trpc_path_ from "./routes/api/trpc/[...path].ts";
import * as $blog from "./routes/blog.tsx";
import * as $blog_id_ from "./routes/blog/[id].tsx";
import * as $index from "./routes/index.tsx";
import * as $internal_account_create from "./routes/internal/account/create.tsx";
import * as $internal_account_login from "./routes/internal/account/login.tsx";
import * as $internal_blog_create from "./routes/internal/blog/create.tsx";
import * as $internal_blog_edit_id_ from "./routes/internal/blog/edit/[id].tsx";
import * as $internal_project_create from "./routes/internal/project/create.tsx";
import * as $internal_project_edit_id_ from "./routes/internal/project/edit/[id].tsx";
import * as $internal_project_view_id_ from "./routes/internal/project/view/[id].tsx";
import * as $projects from "./routes/projects.tsx";
import * as $Account from "./islands/Account.tsx";
import * as $Blog from "./islands/Blog.tsx";
import * as $EditButtons from "./islands/EditButtons.tsx";
import * as $Navigation from "./islands/Navigation.tsx";
import * as $Projects from "./islands/Projects.tsx";
import * as $TrpcPlayground from "./islands/TrpcPlayground.tsx";
import * as $VisitCounter from "./islands/VisitCounter.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/joke.ts": $api_joke,
    "./routes/api/trpc/[...path].ts": $api_trpc_path_,
    "./routes/blog.tsx": $blog,
    "./routes/blog/[id].tsx": $blog_id_,
    "./routes/index.tsx": $index,
    "./routes/internal/account/create.tsx": $internal_account_create,
    "./routes/internal/account/login.tsx": $internal_account_login,
    "./routes/internal/blog/create.tsx": $internal_blog_create,
    "./routes/internal/blog/edit/[id].tsx": $internal_blog_edit_id_,
    "./routes/internal/project/create.tsx": $internal_project_create,
    "./routes/internal/project/edit/[id].tsx": $internal_project_edit_id_,
    "./routes/internal/project/view/[id].tsx": $internal_project_view_id_,
    "./routes/projects.tsx": $projects,
  },
  islands: {
    "./islands/Account.tsx": $Account,
    "./islands/Blog.tsx": $Blog,
    "./islands/EditButtons.tsx": $EditButtons,
    "./islands/Navigation.tsx": $Navigation,
    "./islands/Projects.tsx": $Projects,
    "./islands/TrpcPlayground.tsx": $TrpcPlayground,
    "./islands/VisitCounter.tsx": $VisitCounter,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
