# React 数据请求缓存方案

## 问题背景

在 React 应用中，当多个组件需要共享同一份数据时，如果每个组件都独立发起请求，会导致：

1. **重复请求** - 同一数据被请求多次，浪费带宽
2. **Strict Mode 问题** - React 18 的 Strict Mode 在开发模式下会执行两次 useEffect，导致请求翻倍

### 实际案例

本项目中 `DownloadButton` 组件在页面上使用了 3 次（Header、Hero、Download），如果每个实例都独立请求下载信息：

- 3 个组件 × 2 次（Strict Mode）= 6+ 次请求

## 解决方案

### 方案一：React Context（不完全解决）

使用 Context 共享数据，只在 Provider 中请求一次：

```tsx
// ❌ 问题：Strict Mode 下仍会请求 2 次
export function DownloadProvider({ children }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <DownloadContext.Provider value={data}>
      {children}
    </DownloadContext.Provider>
  );
}
```

### 方案二：useRef 防重复（不完全解决）

```tsx
// ❌ 问题：Strict Mode 卸载组件时 ref 会重置
export function DownloadProvider({ children }) {
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    // fetch...
  }, []);
}
```

### 方案三：模块级缓存（推荐）

```tsx
// ✅ 正确：模块级变量不受组件生命周期影响
let cachedData: Data | null = null;
let fetchPromise: Promise<Data> | null = null;

export function DataProvider({ children }) {
  const [data, setData] = useState<Data | null>(cachedData);
  const [loading, setLoading] = useState(!cachedData);

  useEffect(() => {
    // 已有缓存，直接使用
    if (cachedData) {
      setData(cachedData);
      setLoading(false);
      return;
    }

    // 没有进行中的请求，创建新请求
    if (!fetchPromise) {
      fetchPromise = fetch('/api/data')
        .then(res => res.json())
        .then(data => {
          cachedData = data;  // 缓存数据
          return data;
        });
    }

    // 复用已有的 Promise
    fetchPromise
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <DataContext.Provider value={{ data, loading }}>
      {children}
    </DataContext.Provider>
  );
}
```

## 原理解析

### 变量生命周期对比

| 类型 | 作用域 | 组件卸载后 | Strict Mode |
|------|--------|-----------|-------------|
| useState | 组件实例 | 重置 | 重置 |
| useRef | 组件实例 | 重置 | 重置 |
| 模块级变量 | 整个应用 | **保留** | **保留** |

### 执行流程

```
首次渲染：
  useEffect #1 → cachedData=null, fetchPromise=null
              → 创建 fetchPromise，发起请求

Strict Mode 卸载/重新挂载：
  useEffect #2 → cachedData=null, fetchPromise=已存在
              → 复用已有 Promise，不发起新请求

请求完成：
  → cachedData = 响应数据
  → 后续渲染直接使用缓存
```

### 为什么模块级变量有效？

1. **ES 模块的特性** - 模块只会被加载和执行一次，模块顶层的变量在整个应用生命周期内持久存在
2. **不受 React 控制** - 模块级变量在 React 组件树之外，不受组件挂载/卸载影响
3. **Promise 去重** - 通过缓存 Promise 本身，即使多次调用也只会等待同一个请求

## 使用方式

```tsx
// 在组件中使用
function MyComponent() {
  const { data, loading } = useData();

  if (loading) return <Loading />;
  return <div>{data.name}</div>;
}
```

## 注意事项

1. **缓存失效** - 此方案的缓存在页面刷新前不会失效，如需刷新数据，需要手动清除缓存
2. **SSR 兼容** - 模块级变量在 SSR 时会在服务端保留，需要注意内存泄漏
3. **错误处理** - 请求失败后可能需要重置 `fetchPromise` 以允许重试

## 相关文件

- `src/contexts/DownloadContext.tsx` - 下载信息 Context 实现
- `src/components/ui/DownloadButton.tsx` - 下载按钮组件
