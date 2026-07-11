/**
 * 具体观察者（Concrete Observer）：统计显示板，维护历史最高/最低/平均气温。
 */
public class StatisticsDisplay implements Observer {
    private double maxTemp = Double.NEGATIVE_INFINITY;
    private double minTemp = Double.POSITIVE_INFINITY;
    private double sum = 0;
    private int count = 0;

    @Override
    public void update(double temperature) {
        maxTemp = Math.max(maxTemp, temperature);
        minTemp = Math.min(minTemp, temperature);
        sum += temperature;
        count++;
        System.out.printf("[统计显示板] 最高 %.1f°C / 最低 %.1f°C / 平均 %.1f°C%n",
                maxTemp, minTemp, sum / count);
    }
}
