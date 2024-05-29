using LiveFest.Domains;
using LiveFest.Interface;

namespace LiveFest.Repository
{
    public class UsersRepository : IUsersRepository
    {
        public void CreateUser(Users newUser)
        {
            throw new NotImplementedException();
        }

        public void DeleteUser(Guid id)
        {
            throw new NotImplementedException();
        }

        public Users GetUserById(Guid id)
        {
            throw new NotImplementedException();
        }

        public List<Users> GetUsers()
        {
            throw new NotImplementedException();
        }

        public Users Login(string email, string password)
        {
            throw new NotImplementedException();
        }

        public bool UpdatePasswaord(string email, string newPassword)
        {
            throw new NotImplementedException();
        }

        public void UpdateUser(Guid id, Users newUser)
        {
            throw new NotImplementedException();
        }
    }
}
