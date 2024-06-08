interface APPRouteType {
    path: string;
    element: React.ReactNode;
}

interface APPRoutesType {
    [key: string]: APPRouteType;
}


export const checkPathAgainstRoutes = (path: string, routes: APPRoutesType): boolean => {
    console.log("routes", routes)
    return Object.values(routes).map(route => route.path).includes(path);
};


export const extractParamsFromRoutes= (pathname: string) => {
    const pathParts = pathname.split('/').filter(part => part !== '');
    const params: Record<string, string> = {};

    pathParts.forEach((part, index) => {
        params[part] = pathParts[index];
    });
    return params;
  };

