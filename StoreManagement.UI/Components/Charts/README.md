# Solar Energy Charts Collection

Bộ sưu tập các biểu đồ chuyên dụng cho hệ thống quản lý năng lượng mặt trời.

## 📊 Danh sách Charts

### 1. SolarChart.razor
**Mục đích**: Hiển thị mối tương quan giữa bức xạ mặt trời và năng suất cụ thể
- **Dữ liệu**: Specific Yield (kWh/kWp) và Irradiance (W/m²)
- **Kiểu chart**: Dual-axis line chart
- **Màu sắc**: Xanh lá (#2ecc71) và Xanh dương (#3498db)

```razor
<SolarChart 
    Title="Irradiance vs Specific Yield Correlation"
    Subtitle="Real-time Intraday Hourly Generation"
    PrimaryData="@solarPrimaryData"
    SecondaryData="@solarSecondaryData"
    PrimaryLabel="Specific Yield (kWh/kWp)"
    SecondaryLabel="Irradiance (W/m²)" />
```

### 2. PerformanceChart.razor
**Mục đích**: Phân tích hiệu suất thực tế so với kỳ vọng
- **Dữ liệu**: Actual Performance, Expected Performance, Efficiency Ratio
- **Kiểu chart**: Multi-axis line chart với metrics cards
- **Màu sắc**: Xanh dương (#3498db), Đỏ (#e74c3c), Xanh lá (#2ecc71)

```razor
<PerformanceChart 
    Title="Performance Analysis"
    Subtitle="Real-time Performance Monitoring"
    ActualData="@performanceActualData"
    ExpectedData="@performanceExpectedData"
    EfficiencyData="@performanceEfficiencyData"
    PerformanceRating="87.3"
    CurrentOutput="4.2"
    CapacityFactor="23.8"
    TargetAchievement="94.5" />
```

### 3. DegradationChart.razor
**Mục đích**: Theo dõi suy giảm hiệu suất theo thời gian
- **Dữ liệu**: Performance Ratio, Degradation Trend, Expected Baseline
- **Kiểu chart**: Long-term trend analysis
- **Màu sắc**: Tím (#8e44ad) theme với gradient

```razor
<DegradationChart 
    Title="Degradation Analysis"
    Subtitle="Performance Degradation Over Time"
    PerformanceData="@degradationPerformanceData"
    TrendData="@degradationTrendData"
    BaselineData="@degradationBaselineData"
    DegradationRate="0.45"
    CurrentPerformance="94.2"
    SystemAge="3.2"
    ExpectedLifetime="25" />
```

### 4. WeatherImpactChart.razor
**Mục đích**: Phân tích tác động của thời tiết đến hiệu suất
- **Dữ liệu**: Solar Irradiance, Temperature, Power Output, Efficiency
- **Kiểu chart**: Multi-dataset correlation với weather forecast
- **Màu sắc**: Xanh ngọc (#16a085) theme

```razor
<WeatherImpactChart 
    Title="Weather Impact Analysis"
    Subtitle="Environmental Factors vs Performance"
    IrradianceData="@weatherIrradianceData"
    TemperatureData="@weatherTemperatureData"
    OutputData="@weatherOutputData"
    EfficiencyData="@weatherEfficiencyData"
    CurrentWeather="Partly Cloudy"
    Temperature="28.5"
    WeatherForecast="@weatherForecast" />
```

## 🎨 Design Features

### Responsive Design
- Tất cả charts đều responsive và tối ưu cho mobile
- Grid layout tự động điều chỉnh theo kích thước màn hình
- Touch-friendly controls

### Visual Effects
- **Gradient backgrounds**: Mỗi chart có theme màu riêng biệt
- **Glass morphism**: Backdrop blur effects
- **Smooth animations**: Chart transitions và hover effects
- **Custom legends**: Thay thế legend mặc định của Chart.js

### Interactive Elements
- **Tooltips**: Custom styled với thông tin chi tiết
- **Hover effects**: Point highlighting và border effects
- **Real-time updates**: Support cho cập nhật dữ liệu động

## 🔧 Technical Implementation

### JavaScript Integration
File `wwwroot/js/chartHelper.js` chứa các function:
- `getPerformanceChartConfig()`: Cấu hình cho Performance Chart
- `getDegradationChartConfig()`: Cấu hình cho Degradation Chart  
- `getWeatherChartConfig()`: Cấu hình cho Weather Chart
- `getSolarChartConfig()`: Cấu hình cho Solar Chart (đã có)

### Data Structure
```csharp
// Dữ liệu dạng Dictionary<string, double>
private Dictionary<string, double> sampleData = new()
{
    { "06:00", 150 },
    { "08:00", 450 },
    { "10:00", 750 },
    // ...
};

// Weather forecast data
private List<WeatherForecastItem> weatherForecast = new()
{
    new() { Day = "Mon", Condition = "Sunny", Temperature = 29, ExpectedImpact = 95 },
    // ...
};
```

### Performance Optimization
- **Lazy loading**: Charts chỉ khởi tạo khi cần thiết
- **Memory management**: Proper disposal của Chart.js instances
- **Efficient updates**: Chỉ update data thay vì recreate chart

## 📱 Usage Examples

### Basic Usage
```razor
@page "/solar-dashboard"
@using StoreManagement.UI.Components.Charts

<div class="dashboard-container">
    <SolarChart />
    <PerformanceChart />
    <DegradationChart />
    <WeatherImpactChart />
</div>
```

### Advanced Usage với Custom Data
```razor
<PerformanceChart 
    ActualData="@GetRealTimeData()"
    ExpectedData="@GetExpectedData()"
    EfficiencyData="@CalculateEfficiency()"
    @ref="performanceChartRef" />

@code {
    private PerformanceChart performanceChartRef;
    
    protected override async Task OnInitializedAsync()
    {
        // Load data from API
        var data = await DataService.GetPerformanceDataAsync();
        
        // Update chart
        if (performanceChartRef != null)
        {
            await performanceChartRef.UpdateChart(data.Actual, data.Expected, data.Efficiency);
        }
    }
}
```

## 🚀 Demo Page

Truy cập `/charts-demo` để xem tất cả charts hoạt động với dữ liệu mẫu.

## 📋 Requirements

- **Chart.js**: ^4.0.0 (đã include trong project)
- **Blazor Server**: .NET 8.0+
- **Font Awesome**: Cho icons (đã include)

## 🎯 Best Practices

1. **Data Validation**: Luôn kiểm tra dữ liệu trước khi truyền vào chart
2. **Error Handling**: Implement try-catch trong JavaScript functions
3. **Performance**: Sử dụng `UpdateChart()` thay vì tạo mới chart
4. **Accessibility**: Đảm bảo charts có proper labels và descriptions
5. **Responsive**: Test trên nhiều kích thước màn hình khác nhau

## 🔄 Future Enhancements

- [ ] Export chart as PNG/PDF
- [ ] Real-time data streaming
- [ ] Advanced filtering options
- [ ] Custom color themes
- [ ] Animation presets
- [ ] Data comparison tools
