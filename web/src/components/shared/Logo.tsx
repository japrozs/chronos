import React from "react";

interface LogoProps {
    logoOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({}) => {
    return (
        <svg
            className="h-20 w-auto"
            // width="823"
            // height="158"
            // viewBox="0 0 823 158"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M52.6068 0.112054C32.2849 1.81846 14.972 13.6286 6.03482 31.8827C2.64409 38.8207 0.870136 45.3993 0.218937 53.4149C-0.072979 57.1645 -0.072979 75.3065 0.218937 79.0561C1.36415 93.3585 6.75339 105.191 16.6112 115.093C21.3942 119.898 25.5933 122.906 31.7684 125.96C36.0798 128.093 40.2564 129.575 44.8148 130.585C47.981 131.281 52.966 131.91 55.4137 131.91C56.1826 131.91 56.8059 132.533 56.8059 133.302V144.955V155.906C56.8059 157.036 57.7671 157.928 58.8941 157.843C62.3523 157.596 66.4391 157.057 69.0439 156.473C75.0843 155.149 82.6517 151.96 87.7939 148.592C101.267 139.746 110.339 125.78 112.831 110.041C113.572 105.393 113.64 101.486 113.572 76.9005C113.483 55.0315 113.438 52.2474 113.078 49.7327C111.237 36.7101 105.646 25.3714 96.6412 16.4128C87.8389 7.65619 76.4989 2.06545 64.216 0.471298C60.8703 0.0446952 55.5034 -0.134927 52.6068 0.112054ZM63.3852 26.8085C73.8941 29.2558 82.27 36.755 85.7506 46.8363C87.2999 51.3043 87.2101 49.351 87.2775 78.1355C87.3672 103.799 87.3449 104.203 86.8958 106.628C85.6606 112.982 82.9437 118.146 78.3852 122.727C74.725 126.364 70.7729 128.789 66.0124 130.293C63.4751 131.102 60.1742 131.685 58.2206 131.685C57.4392 131.685 56.8059 131.052 56.8059 130.271V118.797V107.748C56.8059 106.708 56.0006 105.841 54.9646 105.752C50.5633 105.393 47.1502 104.495 43.6696 102.811C36.0573 99.1738 30.3986 92.7298 27.7264 84.6916C26.3342 80.4706 26.2668 79.5275 26.2668 65.9885C26.2668 54.5601 26.2894 53.6395 26.7385 51.3717C29.2086 38.5737 38.999 28.8292 51.7534 26.4941C54.3582 26.0225 60.7354 26.1798 63.3852 26.8085Z"
                fill="#007AFF"
            />
            <path
                d="M215.968 126.147L215.805 126.311C202.37 126.311 191.448 122.325 183.037 114.352C174.736 106.379 170.586 96.1671 170.586 83.7164C170.586 71.1565 174.791 60.9448 183.201 53.0812C191.611 45.1084 202.479 41.122 215.805 41.122C226.399 41.122 235.41 43.6886 242.837 48.8217C250.374 53.9549 255.343 60.8902 257.746 69.6275H235.792C233.936 66.2418 231.26 63.566 227.765 61.6001C224.269 59.525 220.283 58.4874 215.805 58.4874C208.814 58.4874 203.025 60.8356 198.438 65.5319C193.96 70.2282 191.721 76.2351 191.721 83.5526C191.721 90.8701 193.96 96.877 198.438 101.573C203.025 106.27 208.923 108.618 216.132 108.618C223.45 108.618 229.239 106.215 233.499 101.41C237.868 96.4948 239.67 90.2148 238.905 82.5697H260.204C260.968 95.4572 257.2 105.942 248.899 114.024C240.598 122.106 229.621 126.147 215.968 126.147ZM325.132 40.9582L324.968 41.122C334.471 41.122 342.007 44.0708 347.577 49.9685C353.148 55.8662 355.933 63.9482 355.933 74.2146V124.673H335.126V77.9826C335.126 71.9757 333.542 67.2794 330.375 63.8936C327.207 60.5079 322.784 58.8151 317.104 58.8151C310.987 58.8151 306.072 60.7264 302.359 64.5489C298.754 68.2623 296.788 73.4501 296.461 80.1123V124.673H275.981V6.71875H296.461V58.8151H296.625C301.649 46.9105 311.151 40.9582 325.132 40.9582ZM422.809 40.9582L422.645 40.7943C424.065 40.7943 425.102 40.8489 425.758 40.9582V61.2724H421.662C404.295 61.2724 395.612 71.8118 395.612 92.8906V124.509H375.133V42.5964H394.793V66.6787H394.957C399.107 49.5317 408.391 40.9582 422.809 40.9582ZM478.365 126.147C465.04 126.147 454.118 122.161 445.598 114.188C437.079 106.215 432.819 96.0033 432.819 83.5526C432.819 71.1019 437.079 60.8902 445.598 52.9174C454.118 44.9446 465.04 40.9582 478.365 40.9582C491.581 40.9582 502.449 44.9446 510.969 52.9174C519.488 60.8902 523.748 71.1019 523.748 83.5526C523.748 96.0033 519.488 106.215 510.969 114.188C502.449 122.161 491.581 126.147 478.365 126.147ZM460.507 101.737C465.204 106.433 471.157 108.782 478.365 108.782C485.574 108.782 491.527 106.433 496.223 101.737C500.92 96.9317 503.268 90.8701 503.268 83.5526C503.268 76.2351 500.92 70.2282 496.223 65.5319C491.527 60.7264 485.574 58.3236 478.365 58.3236C471.157 58.3236 465.204 60.7264 460.507 65.5319C455.92 70.2282 453.626 76.2351 453.626 83.5526C453.626 90.8701 455.92 96.9317 460.507 101.737ZM588.92 40.9582H588.756C598.258 40.9582 605.795 43.907 611.365 49.8047C616.936 55.7024 619.721 63.7844 619.721 74.0508V124.509H598.914V77.8188C598.914 71.8118 597.33 67.1155 594.162 63.7298C590.995 60.3441 586.571 58.6512 580.892 58.6512C574.557 58.6512 569.533 60.7264 565.819 64.8766C562.105 69.0268 560.249 74.7061 560.249 81.9144V124.673H539.769V42.7602H560.249V58.8151H560.412C565.437 46.9105 574.939 40.9582 588.92 40.9582ZM680.28 126.147C666.955 126.147 656.032 122.161 647.513 114.188C638.993 106.215 634.734 96.0033 634.734 83.5526C634.734 71.1019 638.993 60.8902 647.513 52.9174C656.032 44.9446 666.955 40.9582 680.28 40.9582C693.496 40.9582 704.364 44.9446 712.883 52.9174C721.403 60.8902 725.662 71.1019 725.662 83.5526C725.662 96.0033 721.403 106.215 712.883 114.188C704.364 122.161 693.496 126.147 680.28 126.147ZM662.422 101.737C667.118 106.433 673.071 108.782 680.28 108.782C687.489 108.782 693.441 106.433 698.138 101.737C702.835 96.9317 705.183 90.8701 705.183 83.5526C705.183 76.2351 702.835 70.2282 698.138 65.5319C693.441 60.7264 687.489 58.3236 680.28 58.3236C673.071 58.3236 667.118 60.7264 662.422 65.5319C657.834 70.2282 655.541 76.2351 655.541 83.5526C655.541 90.8701 657.834 96.9317 662.422 101.737ZM779.216 126.147H779.053C766.71 126.147 756.607 123.089 748.743 116.973C740.879 110.748 736.838 102.556 736.619 92.3992H757.59C757.699 97.7508 759.72 102.065 763.652 105.341C767.693 108.509 772.991 110.092 779.544 110.092C784.787 110.092 788.992 109.055 792.159 106.98C795.327 104.904 796.911 102.119 796.911 98.6245C796.911 93.819 793.579 90.9794 786.917 90.1056L767.912 87.8121C751.637 85.737 743.5 78.6379 743.5 66.5148C743.5 58.7605 746.504 52.5897 752.511 48.0026C758.518 43.3063 766.656 40.9582 776.923 40.9582C787.19 40.9582 795.327 43.0333 801.334 47.1835C807.341 51.2245 810.891 57.013 811.983 64.5489H791.176C789.429 58.8697 784.678 56.03 776.923 56.03C772.881 56.03 769.659 56.8492 767.256 58.4874C764.853 60.1257 763.652 62.4192 763.652 65.3681C763.652 69.7367 766.874 72.3579 773.318 73.2317L792.159 75.5252C808.98 77.6003 817.39 84.9178 817.39 97.4777C817.39 106.106 813.895 113.041 806.905 118.283C799.914 123.526 790.685 126.147 779.216 126.147Z"
                fill="white"
            />
        </svg>
    );
};
