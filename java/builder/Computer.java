/**
 * 产品（Product）：Computer。
 * 由 CPU / 内存 / 存储 / GPU 等多个部件组成，构造过程较复杂，
 * 因此把构造逻辑交给内部的 Builder 静态类，Computer 本身保持不可变（immutable）。
 */
public final class Computer {
    private final String cpu;
    private final int memoryGb;
    private final int storageGb;
    private final String gpu;

    private Computer(Builder builder) {
        this.cpu = builder.cpu;
        this.memoryGb = builder.memoryGb;
        this.storageGb = builder.storageGb;
        this.gpu = builder.gpu;
    }

    @Override
    public String toString() {
        return """
            Computer 配置清单:
              CPU  : %s
              内存 : %dGB
              存储 : %dGB
              GPU  : %s
            """.formatted(cpu, memoryGb, storageGb, gpu == null ? "集成显卡" : gpu);
    }

    /**
     * 建造者（Builder）：提供链式方法逐步设置各配件参数，
     * 最后调用 build() 才真正产出不可变的 Computer 实例。
     */
    public static class Builder {
        private String cpu = "未指定";
        private int memoryGb = 8;
        private int storageGb = 256;
        private String gpu;

        public Builder cpu(String cpu) {
            this.cpu = cpu;
            return this;
        }

        public Builder memoryGb(int memoryGb) {
            this.memoryGb = memoryGb;
            return this;
        }

        public Builder storageGb(int storageGb) {
            this.storageGb = storageGb;
            return this;
        }

        public Builder gpu(String gpu) {
            this.gpu = gpu;
            return this;
        }

        public Computer build() {
            return new Computer(this);
        }
    }
}
