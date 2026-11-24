declare module "virtual:file-routes" {
  export interface FileRouteLazyRef<M = Record<string, unknown>> {
    src: string;
    import(): Promise<M>;
  }

  export interface FileRouteEagerRef<M = Record<string, unknown>> {
    src?: string;
    require(): M;
  }

  export interface FileRouteEntry {
    path: string;
    page?: boolean;
    server?: boolean;
    $component?: FileRouteLazyRef<any> | FileRouteEagerRef<any>;
    $$route?: FileRouteEagerRef<any>;
    [key: string]: unknown;
  }

  export interface FileRouteTreeEntry extends FileRouteEntry {
    id: string;
    children?: readonly FileRouteTreeEntry[];
  }

  const routes: readonly [
    {
      path: "/404";
      page: true;
      $component: FileRouteLazyRef<Pick<typeof import("./src/routes/404"), Extract<"default", keyof typeof import("./src/routes/404")>>>;
      $$route: FileRouteEagerRef<Pick<typeof import("./src/routes/404"), Extract<"route", keyof typeof import("./src/routes/404")>>>;
    },
    {
      path: "/*404";
      page: true;
      $component: FileRouteLazyRef<Pick<typeof import("./src/routes/[...404]"), Extract<"default", keyof typeof import("./src/routes/[...404]")>>>;
      $$route: FileRouteEagerRef<Pick<typeof import("./src/routes/[...404]"), Extract<"route", keyof typeof import("./src/routes/[...404]")>>>;
    },
    {
      path: "/blog";
      page: true;
      $component: FileRouteLazyRef<Pick<typeof import("./src/routes/blog"), Extract<"default", keyof typeof import("./src/routes/blog")>>>;
      $$route?: undefined;
    },
    {
      path: "/blog/:slug";
      page: true;
      $component: FileRouteLazyRef<Pick<typeof import("./src/routes/blog/[slug]"), Extract<"default", keyof typeof import("./src/routes/blog/[slug]")>>>;
      $$route: FileRouteEagerRef<Pick<typeof import("./src/routes/blog/[slug]"), Extract<"route", keyof typeof import("./src/routes/blog/[slug]")>>>;
    },
    {
      path: "/blog/";
      page: true;
      $component: FileRouteLazyRef<Pick<typeof import("./src/routes/blog/index"), Extract<"default", keyof typeof import("./src/routes/blog/index")>>>;
      $$route?: undefined;
    },
    {
      path: "/";
      page: true;
      $component: FileRouteLazyRef<Pick<typeof import("./src/routes/index"), Extract<"default", keyof typeof import("./src/routes/index")>>>;
      $$route?: undefined;
    },
    {
      path: "/projects";
      page: true;
      $component: FileRouteLazyRef<Pick<typeof import("./src/routes/projects"), Extract<"default", keyof typeof import("./src/routes/projects")>>>;
      $$route?: undefined;
    },
    {
      path: "/users";
      page: true;
      $component: FileRouteLazyRef<Pick<typeof import("./src/routes/users"), Extract<"default", keyof typeof import("./src/routes/users")>>>;
      $$route?: undefined;
    },
    {
      path: "/users/:id";
      page: true;
      $component: FileRouteLazyRef<Pick<typeof import("./src/routes/users/[id]"), Extract<"default", keyof typeof import("./src/routes/users/[id]")>>>;
      $$route: FileRouteEagerRef<Pick<typeof import("./src/routes/users/[id]"), Extract<"route", keyof typeof import("./src/routes/users/[id]")>>>;
    },
    {
      path: "/users/";
      page: true;
      $component: FileRouteLazyRef<Pick<typeof import("./src/routes/users/index"), Extract<"default", keyof typeof import("./src/routes/users/index")>>>;
      $$route?: undefined;
    }
  ];
  export default routes;

  export const pageRoutes: readonly [
    {
      path: "/";
      id: "/";
      page: true;
      $component: FileRouteLazyRef<Pick<typeof import("./src/routes/index"), Extract<"default", keyof typeof import("./src/routes/index")>>>;
      $$route?: undefined;
      children?: undefined;
    },
    {
      path: "/404";
      id: "/404";
      page: true;
      $component: FileRouteLazyRef<Pick<typeof import("./src/routes/404"), Extract<"default", keyof typeof import("./src/routes/404")>>>;
      $$route: FileRouteEagerRef<Pick<typeof import("./src/routes/404"), Extract<"route", keyof typeof import("./src/routes/404")>>>;
      children?: undefined;
    },
    {
      path: "/*404";
      id: "/*404";
      page: true;
      $component: FileRouteLazyRef<Pick<typeof import("./src/routes/[...404]"), Extract<"default", keyof typeof import("./src/routes/[...404]")>>>;
      $$route: FileRouteEagerRef<Pick<typeof import("./src/routes/[...404]"), Extract<"route", keyof typeof import("./src/routes/[...404]")>>>;
      children?: undefined;
    },
    {
      path: "/blog";
      id: "/blog";
      page: true;
      $component: FileRouteLazyRef<Pick<typeof import("./src/routes/blog"), Extract<"default", keyof typeof import("./src/routes/blog")>>>;
      $$route?: undefined;
      children: readonly [
        {
          path: "/";
          id: "/";
          page: true;
          $component: FileRouteLazyRef<Pick<typeof import("./src/routes/blog/index"), Extract<"default", keyof typeof import("./src/routes/blog/index")>>>;
          $$route?: undefined;
          children?: undefined;
        },
        {
          path: "/:slug";
          id: "/:slug";
          page: true;
          $component: FileRouteLazyRef<Pick<typeof import("./src/routes/blog/[slug]"), Extract<"default", keyof typeof import("./src/routes/blog/[slug]")>>>;
          $$route: FileRouteEagerRef<Pick<typeof import("./src/routes/blog/[slug]"), Extract<"route", keyof typeof import("./src/routes/blog/[slug]")>>>;
          children?: undefined;
        }
      ];
    },
    {
      path: "/users";
      id: "/users";
      page: true;
      $component: FileRouteLazyRef<Pick<typeof import("./src/routes/users"), Extract<"default", keyof typeof import("./src/routes/users")>>>;
      $$route?: undefined;
      children: readonly [
        {
          path: "/";
          id: "/";
          page: true;
          $component: FileRouteLazyRef<Pick<typeof import("./src/routes/users/index"), Extract<"default", keyof typeof import("./src/routes/users/index")>>>;
          $$route?: undefined;
          children?: undefined;
        },
        {
          path: "/:id";
          id: "/:id";
          page: true;
          $component: FileRouteLazyRef<Pick<typeof import("./src/routes/users/[id]"), Extract<"default", keyof typeof import("./src/routes/users/[id]")>>>;
          $$route: FileRouteEagerRef<Pick<typeof import("./src/routes/users/[id]"), Extract<"route", keyof typeof import("./src/routes/users/[id]")>>>;
          children?: undefined;
        }
      ];
    },
    {
      path: "/projects";
      id: "/projects";
      page: true;
      $component: FileRouteLazyRef<Pick<typeof import("./src/routes/projects"), Extract<"default", keyof typeof import("./src/routes/projects")>>>;
      $$route?: undefined;
      children?: undefined;
    }
  ];
}
