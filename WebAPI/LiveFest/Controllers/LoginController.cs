using LiveFest.Domains;
using LiveFest.Interface;
using LiveFest.Repository;
using LiveFest.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace LiveFest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IUsersRepository _usersRepository;

        public LoginController()
        {
            _usersRepository = new UsersRepository();
        }

        [HttpPost]

        public IActionResult Login(LoginViewModel user)
        {
            try
            {
                Users searchUser = _usersRepository.Login(user.Email!, user.Password!);
                if (searchUser == null)
                {
                    return StatusCode(401, "Email ou Senha Inválidos");
                }
                return Ok("Login Successful");

                //        // IMPLEMENTAR AUTENTICAÇÃO JWT 

                //        // 1°- Definir as informações (claims) que serão fornecidos no token (PAYLOAD)
                //        var claims = new[]
                //        {
                //    // Formato da Claim
                //    // JTI serve para a identificação de ID (identificador)
                //    new Claim(JwtRegisteredClaimNames.Jti, searchUser.ID.ToString()),
                //    new Claim(JwtRegisteredClaimNames.Email, searchUser.Email)
                //};

                //        // 2°- Definir a chave de acesso ao token
                //        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("chave-autenticacao-webapi-eventos-livefest"));

                //        // 3°- Definir as credenciais do token (HEADER)
                //        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                //        // 4°- Gerar o token
                //        var token = new JwtSecurityToken
                //        (
                //            issuer: "webapi.LiveFest",
                //            audience: "webapi.LiveFest",
                //            claims: claims,
                //            expires: DateTime.Now.AddMinutes(5),
                //            signingCredentials: creds
                //        );

                //        // 5°- Retornar o token criado
                //        return Ok(new
                //        {
                //            token = new JwtSecurityTokenHandler().WriteToken(token)
                //        });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
