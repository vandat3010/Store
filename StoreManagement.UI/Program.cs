using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using StoreManagement.UI;
using StoreManagement.UI.Services;
using StoreManagement.UI.Services.Interfaces;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri("https://localhost:1999") });
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<ThemeService>();

await builder.Build().RunAsync();
