import { Fragment, useContext } from 'react';
import MainHeader from './main-header';
import { NotificationContextProvider } from '../ui/notification';
import NotificationContext from '../../store/notification-context';
import Notification from '../ui/notification';  // Import the Notification component

function Layout(props) {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
