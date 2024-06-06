namespace LiveFest.Utils.Email
{
    public class EmailSettings
    {

        //Email do Remetente 
        public string? Email { get; set; }
        //Senha do Remetente 
        public string? Password { get; set; }

        //Host do servidor SMTP 
        public string? Host { get; set; }
        //Nome que sera exibido do remetente
        public string? DisplayName { get; set; }
        //Portar Do Servidor SMTP
        public int Port { get; set; }
    }
}
