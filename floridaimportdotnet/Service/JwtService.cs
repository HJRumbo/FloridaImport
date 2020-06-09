using Entity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using floridaimportdotnet.Config;
using floridaimportdotnet.Models;

namespace floridaimportdotnet.Service
{
    
    public class JwtService 
    {
       

        private readonly AppSetting _appSettings;

        public JwtService(IOptions<AppSetting> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public LoginViewModel GenerateToken(Cliente cliente)
        {
            // return null if user not found
            if (cliente == null)
                return null;

            var userResponse = new LoginViewModel() { Nombre = cliente.Nombre, Apellido = cliente.Apellido, Correo = cliente.Correo };

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, cliente.Nombre.ToString()),
                    new Claim(ClaimTypes.Email, cliente.Correo.ToString()),
                    new Claim(ClaimTypes.Role, cliente.Rol.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            userResponse.Token = tokenHandler.WriteToken(token);

            return userResponse;
        }
        
    }
}