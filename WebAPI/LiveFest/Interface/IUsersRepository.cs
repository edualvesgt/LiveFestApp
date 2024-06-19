using LiveFest.Domains;

namespace LiveFest.Interface
{
    public interface IUsersRepository
    {
        List<Users> GetUsers();

        Users GetUserById(Guid id);

        void CreateUser(Users newUser);

        void UpdateUser(Guid id ,Users newUser);

        void DeleteUser(Guid id);

        Users Login (string email , string password);

        bool UpdatePasswaord(string email, string newPassword);
    }
}
