namespace LiveFest.Utils
{
    public class Criptografia
    {
        public static string Hash (string password)
        {
            return BCrypt.Net.BCrypt.HashPassword (password);
        }

        public static bool Compare (string formPassword ,  string password)
        {
            return BCrypt.Net.BCrypt.Verify(formPassword, password);
        }
    }
}
