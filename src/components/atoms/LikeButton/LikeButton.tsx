import { MouseEventHandler, useState } from 'react';
import likeIcon from '../../../assets/like_btn.svg';
import likeIconActive from '../../../assets/like_btn_active.svg';

interface LikeButtonProps {
    className?: string;
    onClick?: MouseEventHandler;
    isActive?: boolean
}

const LikeButton: React.FC<LikeButtonProps> = ({className, onClick, isActive}) => {
    const [hovered, setHovered] = useState<boolean>(false);

    const isMobile = window.matchMedia('(hover: none)').matches;

    return (
        <button
            className={className}
            onClick={onClick}
            onMouseEnter={() => setHovered(!isMobile && true)}
            onMouseLeave={() => setHovered(false)}
        >
            <img src={(isActive || hovered) ? likeIconActive : likeIcon}/>
        </button>
    );
};

export default LikeButton;
