namespace FitHappens.WebApi.Abstractions
{
    public interface IUserService
    {
        Guid GetIdForKey(string key);
        bool IsValid(string key);
    }
}
