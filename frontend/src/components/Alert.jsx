import { useContext, useEffect } from 'react'
import { PantryContext } from '../store/pantryContext';

export default function Alert() {
    const { notifications } = useContext(PantryContext);
  useEffect(()=>{console.log("Changed")},[notifications]);
    return (
        <div>
            {notifications.map((notif) => (
                <div key={notif.id} className={`alert alert-${notif.type} position-absolute`} style={{top:'30px',right:'30px',zIndex:'10'}}>
                    {notif.message} This
                </div>
            ))}
        </div>
    );

}
