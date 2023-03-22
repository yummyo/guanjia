// 校验参数是否是控制
export const isTrue = (value: any): Boolean => {
  return value !== null && value !== undefined && value !== false
}
