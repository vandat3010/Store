using Microsoft.JSInterop;

namespace StoreManagement.UI.Services
{
    public class ThemeService
    {
        private readonly IJSRuntime _jsRuntime;
        private bool _isDarkMode = true; // Default to dark mode
        
        public event Action<bool>? ThemeChanged;

        public ThemeService(IJSRuntime jsRuntime)
        {
            _jsRuntime = jsRuntime;
        }

        public bool IsDarkMode => _isDarkMode;

        public async Task InitializeAsync()
        {
            try
            {
                _isDarkMode = await _jsRuntime.InvokeAsync<bool>("getTheme");
            }
            catch
            {
                _isDarkMode = true; // Default to dark if unable to get from storage
            }
            
            await ApplyThemeAsync();
        }

        public async Task ToggleThemeAsync()
        {
            _isDarkMode = !_isDarkMode;
            await ApplyThemeAsync();
            ThemeChanged?.Invoke(_isDarkMode);
        }

        public async Task SetThemeAsync(bool isDark)
        {
            _isDarkMode = isDark;
            await ApplyThemeAsync();
            ThemeChanged?.Invoke(_isDarkMode);
        }

        private async Task ApplyThemeAsync()
        {
            await _jsRuntime.InvokeVoidAsync("setTheme", _isDarkMode);
        }
    }
}
