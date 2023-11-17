import styled from "styled-components";
import React from "react";
import ReactDOM from "react-dom";
import { Star as StarIcon } from "@mui/icons-material";
import { motion, useAnimation } from "framer-motion";

//const shapes = [];
const colors = [ "#fff", "#f00", "#0f0", "#00f", "#ff0", "#f0f" ];

const ConfettiItem = (props: NConfettiGun.IConfettiItemProps) => {
  const { acceleration: accelerationInit, id } = props;
  const { x = Math.random() * 15, y = 1 } = accelerationInit || {};

  const shouldDelete = React.useRef(false);
  const position = React.useRef<NConfettiGun.IConfettiItemProps["acceleration"]>({
    x: 0,
    y: 0
  });
  const velocity = React.useRef<NConfettiGun.IConfettiItemProps["acceleration"]>({
    x: Math.random() * 10 + 50,
    y: Math.random() * -30
  });
  const acceleration = React.useRef<NConfettiGun.IConfettiItemProps["acceleration"]>({
    x,
    y 
  });
  const rotation = React.useRef<NConfettiGun.IConfettiItemProps["acceleration"]>({
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50
  });
  const lastFrameId = React.useRef<number | null>(null);

  const [color] = React.useState(colors[Math.floor(Math.random() * colors.length)]);

  const itemRef = React.useRef<HTMLDivElement>(null);

  const controls = useAnimation();

  const animate: FrameRequestCallback = (t) => {
    let pos: DOMRect | null = null;

    if(itemRef.current) {
      velocity.current = {
        x: (velocity.current?.x || 0) + ((velocity.current?.x || 0) > 0 ? -1 : (velocity.current?.x || 0) < 0 ? 1 : 0) * ((velocity.current?.x || 0) / (acceleration.current?.x || 0)),
        y: (velocity.current?.y || 0) + (acceleration.current?.y || 0)
      };
      if((velocity.current?.x || 0) < -50) velocity.current.x = -50;
      if((velocity.current?.x || 0) > 50) velocity.current.x = 50;
      //if((velocity.current?.x || 0) > 1) console.log(velocity.current);
      position.current = {
        x: (position.current?.x || 0) + (velocity.current?.x || 0),
        y: (position.current?.y || 0) + (velocity.current?.y || 0)
      };
      pos = itemRef.current.getBoundingClientRect();

      controls.start({
        x: position.current.x,
        y: position.current.y,
        rotateX: Math.sin(t) * (rotation.current?.x || 0),
        rotateY: Math.sin(t) * (rotation.current?.y || 0)
      });
    }

    if(pos && lastFrameId.current && (pos.x <= -pos.width || pos.x >= window.innerWidth || pos.y < -pos.height || pos.y >= window.innerHeight)) {
      cancelAnimationFrame(lastFrameId.current);
      if(!shouldDelete.current) props.requestDelete?.(id);
      shouldDelete.current = true;
      return;
    }

    //console.log(pos.x <= window.innerWidth, pos.y <= window.innerHeight, pos.x >= 0, pos.y >= 0);
    lastFrameId.current = requestAnimationFrame(animate);
  };

  // Start the animation loop
  React.useEffect(() => {
    //console.log("init", id);
    animate(0);
  }, [id]);

  return <motion.div id={id} animate={controls} ref={itemRef} style={{
    position: "absolute",
    top: 0,
    left: 0 
  }} className={shouldDelete.current ? "delete" : ""}><StarIcon sx={{ fill: color }} /></motion.div>;
};

const ConfettiGun = (props: NConfettiGun.IProps) => {
  const {
    state,
    count = 50,
    //rotation = 0,
    className,
    //gravity = 9.8,
    portal,
    style,
  } = props;

  const confettiItems = React.useRef<{ el: typeof ConfettiItem, id: string }[]>([]);
  const [ toDelete, setToDelete ] = React.useState<string[]>([]);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const spawnConfetti = () => {
    const el = ConfettiItem;
    confettiItems.current = [
      ...confettiItems.current, {
        el,
        id: `confetti-item-${Math.random()}` 
      } 
    ];
  };

  const handleDeleteItem = (id: string) => {
    setToDelete(state => [ ...state.filter(f => f !== id), id ]);
    //if(containerRef.current) {
    //  console.log(confettiItems.current?.length);
    //  const children = containerRef.current.children;
    //  let allDelete = true;
    //  for(let i = 0; i < children.length; i++) {
    //    if(!children[i].classList.contains("delete")) {
    //      allDelete = false;
    //      console.log("broken");
    //      break;
    //    }
    //  }
    //  if(allDelete) {
    //    confettiItems.current = [];
    //    console.log("removed", confettiItems.current?.length);
    //  }
    //}
  };

  React.useEffect(() => {
    if(state[0]) {
      state[1](false);
      for(let i = 0; i < count; i++) {
        spawnConfetti();
      }
    }
  }, [state[0]]);

  React.useEffect(() => {
    if(
      toDelete.length === confettiItems.current?.length
			&& containerRef.current
			&& containerRef.current.children.length
			&& Array.from(containerRef.current.children).every(item => item.classList.contains("delete"))
    ) {
      confettiItems.current = [];
    }
  }, [toDelete]);

  const el = <ConfettiGunStyle ref={containerRef} className={[ "confetti-gun", className ].join(" ")} style={{ ...style }}>
    {confettiItems.current?.map((item, i) => <item.el key={i} id={item.id} requestDelete={handleDeleteItem} />)}
  </ConfettiGunStyle>;

  return portal ? ReactDOM.createPortal(el, portal) : el;
};

export { ConfettiGun };

export namespace NConfettiGun {
	export interface IProps {
		state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
		count?: number;
		rotation?: number;
		className?: string;
		gravity?: number;
		portal?: HTMLElement;
		style?: React.CSSProperties;
	}

	export interface IConfettiItemProps {
		acceleration?: {
			x?: number;
			y?: number;
		};
		id: string;
		requestDelete: (id: string) => void;
	}
}

const ConfettiGunStyle = styled.div`
	position: fixed;
	width: 0;
	height: 0;
	top: 0;
	left: 0;
	z-index: 9999;
`;