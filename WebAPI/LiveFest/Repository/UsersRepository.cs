using LiveFest.Context;
using LiveFest.Domains;
using LiveFest.Interface;
using LiveFest.Utils;

namespace LiveFest.Repository
{
    public class UsersRepository : IUsersRepository
    {
        private readonly LiveFestContext _context;
        public UsersRepository()
        {
            _context = new LiveFestContext();
        }

        public void CreateUser(Users newUser) 
        {
            try
            {
                newUser.Password = Criptografia.Hash(newUser.Password!);
                _context.Users.Add(newUser);
                _context.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteUser(Guid id)
        {
            throw new NotImplementedException();
        }

        public Users GetUserById(Guid id)
        {
            try
            {
                return _context.Users.FirstOrDefault(x => x.ID == id)!;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<Users> GetUsers()
        {
            try
            {
                return _context.Users.ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Users Login(string email, string password)
        {
            try
            {
                var user = _context.Users.Select(x => new Users
                {
                    ID = x.ID,
                    Email = x.Email,
                    UserName = x.UserName,
                    CPF = x.CPF, 
                    Password = x.Password
                }).FirstOrDefault(y => y.Email == email);

                if (user == null)
                {
                    return null!;

                }

                if (!Criptografia.Compare(password, user.Password!)) return null!;

                return user;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool UpdatePasswaord(string email, string newPassword)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(x => x.Email == email);

                if (user == null) return false;

                user.Password = Criptografia.Hash(newPassword);

               _context.Update(user);

                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void UpdateUser(Guid id, Users newUser)
        {
            throw new NotImplementedException();
        }
    }
}
