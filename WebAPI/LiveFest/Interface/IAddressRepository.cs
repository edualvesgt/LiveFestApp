using LiveFest.Domains;

namespace LiveFest.Interface
{
    public interface IAddressRepository
    {
        public void Register(Address address);

        public Address GetById(Guid id);

        public List<Address> GetAll();
    }
}
