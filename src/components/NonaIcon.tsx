/* Interfaces */
import NonaIconProps from '../interfaces/NonaIconProps';

function NonaIcon(props: NonaIconProps ) {
  return (
    <div className={`nona-icon-container ${props.color}`}>
      <div className="nona-icon-flow">
        {Array(9).fill('nona-icon-circle').map((nonaIconCircle, index) => {
          return (
            <div
              key={`${nonaIconCircle}${index}`}
              className={`${nonaIconCircle} ${props.color}`}
            >
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NonaIcon;
