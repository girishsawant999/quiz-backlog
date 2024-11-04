import { NotificationArgsProps, notification } from "antd";
import { BadgeCheck, Info, Loader, OctagonAlert, OctagonX } from "lucide-react";
import "./styles.scss";

const config: TToastProps = {
  duration: 3,
  placement: "top",
};

type TToastProps = Omit<NotificationArgsProps, "message">;

const toast = {
  error: (message: React.ReactNode, props: TToastProps = {}) =>
    notification.error({
      ...config,
      icon: <OctagonX />,
      message,

      ...props,
    }),
  info: (message: React.ReactNode, props: TToastProps = {}) =>
    notification.info({
      ...config,
      icon: <Info />,
      message,

      ...props,
    }),
  warning: (message: React.ReactNode, props: TToastProps = {}) =>
    notification.warning({
      ...config,
      icon: <OctagonAlert />,
      message,

      ...props,
    }),
  success: (message: React.ReactNode, props: TToastProps = {}) =>
    notification.success({
      ...config,
      icon: <BadgeCheck />,
      message,

      ...props,
    }),
  loading: (message: React.ReactNode, props: TToastProps = {}) =>
    notification.open({
      ...config,
      message,
      ...props,
      duration: 0,
      icon: <Loader className="animate-spin" />,
    }),
  destroy: notification.destroy,
};

export default toast;
