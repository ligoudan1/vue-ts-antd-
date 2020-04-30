const AddDevUrl = "http://192.168.1.88:8090"; //开发环境
export default {
  queryTrack: `${AddDevUrl}/orbit-service/orbitpre/calculate`, // 计算查询轨道预报服务
  earthShadow: `${AddDevUrl}/orbit-service/earthShadow/calculate`, // 地影预报服务
  earthShadowGetData: `${AddDevUrl}/orbit-service/earthShadow/getData`, // 地影服务
  trackingpre: `${AddDevUrl}/orbit-service/tracking/calculate`, // 跟踪预报服务
  transnsit: `${AddDevUrl}/orbit-service/transit/calculate`, // 日凌服务
  gpsOrbit: `${AddDevUrl}/orbit-service/gpsOrbit/calculate`, // gps定轨服务
  exTest: `${AddDevUrl}/orbit-service/exTest/calculate`, // 外测数据
  earthSensorCalculate: `${AddDevUrl}/orbit-service/orbitpre/calculate`, // 红外地球敏感器干扰计算
  sunSensorCalculate: `${AddDevUrl}/orbit-service/sunSensor/calculate`, // 太敏
  eKeepCalculate: `${AddDevUrl}/orbit-service/eKeep/calculate`, // 偏心率
  positionKeepCalculate: `${AddDevUrl}/orbit-service/positionKeep/calculate`, //位置保持
  earthSensorCalculate1: `${AddDevUrl}/orbit-service/sunSensor/calculate`, // 地敏
}
