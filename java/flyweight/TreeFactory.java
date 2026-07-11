import java.util.HashMap;
import java.util.Map;

/**
 * 享元工厂（Flyweight Factory）：保证相同参数的 TreeType 只创建一份，
 * 重复请求时直接从缓存中返回同一个共享实例。
 */
public class TreeFactory {
    private static final Map<String, TreeType> CACHE = new HashMap<>();

    private TreeFactory() {
    }

    public static TreeType getTreeType(String name, String color, String texture) {
        String key = name + "-" + color + "-" + texture;
        // computeIfAbsent：缓存未命中才真正创建，否则直接复用已有的享元对象
        return CACHE.computeIfAbsent(key, k -> {
            System.out.println("  [TreeFactory] 缓存未命中，创建新的 TreeType: " + k);
            return new TreeType(name, color, texture);
        });
    }

    /** 已经创建过的不同 TreeType 数量，用于验证共享效果 */
    public static int getCreatedTypeCount() {
        return CACHE.size();
    }
}
