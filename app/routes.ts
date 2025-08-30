import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    { path: "register", file: "routes/register.tsx" }
] satisfies RouteConfig;
