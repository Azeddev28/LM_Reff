interface APPRouteType {
    path: string;
    element: React.ReactNode;
}

interface APPRoutesType {
    [key: string]: APPRouteType;
}


export const checkPathAgainstRoutes = (path: string, routes: APPRoutesType): boolean => {
    return Object.values(routes).map(route => route.path).includes(path);
};