namespace StoreManagement.UI.Http
{
    public static class ApiRoutes
    {
        public const string Base = "api";

        public static class Customers
        {
            public const string GetAll = $"{Base}/Customer";
            public static string GetById(int id) => $"{Base}/Customer/{id}";

            public const string Create = $"{Base}/Customer";
            public static string Update(int id) => $"{Base}/Customer";
            public static string Delete(int id) => $"{Base}/Customer/{id}";
            public static string Search => $"{Base}/Customer/search";
        }
    }
}
