import React, { FunctionComponent } from 'react'

type LogoProps = {
  isSmall?: boolean
  fillColor?: string
}

const Logo: FunctionComponent<LogoProps> = ({
  isSmall = false,
  fillColor = '#000',
}) => {
  return isSmall ? (
    <div
      style={{
        width: '100%',
        padding: 8,
        cursor: 'pointer',
      }}
    >
      <svg viewBox="0 0 135 154" fill="none">
        <path
          d="M135 63.6668C135 76.0049 130.039 87.175 122.003 95.3106L121.624 95.6899C113.508 103.716 102.358 108.677 90.04 108.687V63.6868H44.9501V63.6768C44.9501 51.3387 49.9113 40.1686 57.947 32.0331L89.9801 0L122.003 32.0231C130.039 40.1586 135 51.3387 135 63.6668Z"
          fill="#63D7E5"
        />
        <path
          d="M90.0399 108.697V108.976C89.9701 120.416 85.5779 131.826 76.8534 140.54C68.1289 149.265 56.7192 153.657 45.2895 153.727H44.7505C33.3108 153.657 21.9011 149.265 13.1866 140.54C4.46207 131.816 0.0698758 120.406 0 108.976V108.437C0.0698758 96.9976 4.46207 85.5879 13.1866 76.8734C21.911 68.1489 33.3208 63.7567 44.7505 63.6868H44.9601C44.9601 76.0149 49.9213 87.1851 57.957 95.3206L58.3363 95.6999C66.4718 103.736 77.642 108.697 89.98 108.697H90.0399Z"
          fill="#6464F6"
        />
      </svg>
    </div>
  ) : (
    <div
      style={{
        width: '100%',
        paddingTop: 24,
        cursor: 'pointer',
      }}
    >
      <svg viewBox="0 0 997 429" fill="none">
        <g clipPath="url(#clip0)">
          <path
            d="M272 195.96V96H290.76V134.19C293.26 130.8 296.41 128.12 300.21 126.15C304 124.19 308.18 123.2 312.74 123.2C317.38 123.2 321.67 124.14 325.6 126.01C329.53 127.89 332.97 130.5 335.92 133.85C338.87 137.2 341.17 141.11 342.82 145.58C344.47 150.05 345.3 154.92 345.3 160.19C345.3 165.55 344.45 170.51 342.76 175.06C341.06 179.62 338.69 183.61 335.66 187.05C332.62 190.49 329.05 193.17 324.94 195.09C320.83 197.01 316.41 197.97 311.67 197.97C307.02 197.97 302.83 196.99 299.07 195.02C295.32 193.06 292.24 190.29 289.82 186.71L289.28 195.96H272ZM308.31 181.09C311.7 181.09 314.74 180.2 317.42 178.41C320.1 176.62 322.22 174.19 323.79 171.11C325.35 168.03 326.13 164.52 326.13 160.59C326.13 156.66 325.35 153.15 323.79 150.07C322.23 146.99 320.1 144.55 317.42 142.77C314.74 140.98 311.7 140.09 308.31 140.09C304.91 140.09 301.88 140.98 299.2 142.77C296.52 144.56 294.4 146.99 292.83 150.07C291.26 153.15 290.49 156.66 290.49 160.59C290.49 164.52 291.27 168.03 292.83 171.11C294.39 174.19 296.52 176.63 299.2 178.41C301.88 180.2 304.92 181.09 308.31 181.09Z"
            fill={fillColor}
          />
          <path
            d="M376.79 197.97C373.13 197.97 369.78 197.43 366.74 196.36C363.7 195.29 361.04 193.75 358.77 191.74C356.5 189.73 354.73 187.38 353.48 184.7C352.23 182.02 351.6 179.07 351.6 175.86C351.6 171.39 352.81 167.46 355.22 164.07C357.63 160.68 361.03 158.02 365.4 156.1C369.78 154.18 374.87 153.22 380.68 153.22C383.63 153.22 386.42 153.49 389.06 154.02C391.69 154.56 394.26 155.31 396.76 156.3V152.15C396.76 148.13 395.62 144.87 393.34 142.37C391.06 139.87 387.96 138.62 384.03 138.62C381.08 138.62 378.4 139.36 375.99 140.83C373.58 142.3 371.88 144.38 370.9 147.06L354.14 143.7C355.12 139.59 357.07 135.99 359.97 132.91C362.87 129.83 366.42 127.44 370.62 125.74C374.82 124.04 379.37 123.19 384.29 123.19C388.85 123.19 393 123.91 396.75 125.33C400.5 126.76 403.74 128.81 406.47 131.49C409.19 134.17 411.29 137.32 412.77 140.94C414.25 144.56 414.98 148.6 414.98 153.07V195.95H398.23L397.69 187.64C395.81 190.68 393.09 193.16 389.52 195.08C385.94 197.01 381.7 197.97 376.79 197.97ZM370.09 174.93C370.09 177.43 371.12 179.49 373.17 181.09C375.22 182.69 377.95 183.5 381.35 183.5C384.3 183.5 386.93 182.88 389.25 181.62C391.57 180.37 393.4 178.65 394.74 176.46C396.08 174.27 396.75 171.84 396.75 169.16V168.49C394.79 167.69 392.69 167.04 390.45 166.55C388.22 166.06 385.98 165.81 383.75 165.81C379.55 165.81 376.22 166.64 373.77 168.29C371.31 169.95 370.09 172.16 370.09 174.93Z"
            fill={fillColor}
          />
          <path
            d="M452.76 197.97C447.76 197.97 443.22 197.17 439.16 195.56C435.09 193.95 431.66 191.67 428.84 188.73C426.03 185.78 424.08 182.3 423.01 178.28L439.89 174.66C440.78 177.43 442.39 179.62 444.71 181.23C447.03 182.84 449.8 183.64 453.02 183.64C456.06 183.64 458.56 182.97 460.52 181.63C462.48 180.29 463.47 178.46 463.47 176.14C463.47 174.18 462.6 172.55 460.86 171.25C459.12 169.96 456.24 168.95 452.22 168.23L448.47 167.56C440.79 166.22 434.96 163.72 430.98 160.06C427 156.4 425.02 151.75 425.02 146.12C425.02 141.65 426.18 137.7 428.5 134.26C430.82 130.82 434.04 128.12 438.15 126.15C442.26 124.19 446.99 123.2 452.35 123.2C457.08 123.2 461.4 123.98 465.28 125.54C469.17 127.1 472.4 129.31 474.99 132.17C477.58 135.03 479.37 138.47 480.35 142.49L463.6 145.97C462.71 143.29 461.25 141.19 459.24 139.67C457.23 138.15 454.88 137.39 452.2 137.39C449.43 137.39 447.15 138.06 445.37 139.4C443.58 140.74 442.69 142.44 442.69 144.49C442.69 146.28 443.56 147.77 445.3 148.98C447.04 150.19 450.01 151.15 454.21 151.86L457.96 152.53C465.55 153.87 471.36 156.4 475.38 160.1C479.4 163.81 481.41 168.52 481.41 174.24C481.41 177.72 480.72 180.9 479.33 183.75C477.94 186.61 475.96 189.11 473.37 191.25C470.78 193.39 467.74 195.05 464.26 196.21C460.8 197.39 456.96 197.97 452.76 197.97Z"
            fill={fillColor}
          />
          <path
            d="M523.92 197.97C518.65 197.97 513.8 197.05 509.38 195.22C504.96 193.39 501.14 190.8 497.92 187.45C494.71 184.1 492.2 180.13 490.42 175.52C488.63 170.92 487.74 165.9 487.74 160.45C487.74 155.18 488.63 150.27 490.42 145.71C492.21 141.15 494.69 137.2 497.86 133.85C501.03 130.5 504.76 127.89 509.05 126.01C513.34 124.13 517.98 123.2 522.99 123.2C528.17 123.2 532.88 124.09 537.13 125.88C541.37 127.67 545.01 130.21 548.05 133.52C551.09 136.82 553.43 140.76 555.09 145.31C556.74 149.87 557.57 154.96 557.57 160.59V165.28H506.78C507.58 170.55 509.5 174.68 512.54 177.67C515.58 180.66 519.42 182.16 524.06 182.16C527.27 182.16 530.2 181.4 532.84 179.88C535.47 178.36 537.64 176.17 539.34 173.31L556.09 178.67C554.48 182.69 552.07 186.13 548.85 188.99C545.64 191.85 541.88 194.06 537.59 195.62C533.3 197.19 528.74 197.97 523.92 197.97ZM522.98 137.67C518.87 137.67 515.41 139.01 512.6 141.69C509.79 144.37 507.93 148.03 507.04 152.68H538.26C537.55 148.04 535.83 144.37 533.1 141.69C530.37 139.01 527 137.67 522.98 137.67Z"
            fill={fillColor}
          />
          <path
            d="M596.95 197.97C592.4 197.97 588.15 197.03 584.22 195.16C580.29 193.28 576.85 190.67 573.9 187.32C570.95 183.97 568.65 180.06 567 175.59C565.35 171.12 564.52 166.26 564.52 160.98C564.52 155.62 565.37 150.66 567.07 146.11C568.77 141.55 571.13 137.56 574.17 134.12C577.21 130.68 580.76 128 584.82 126.08C588.88 124.16 593.28 123.2 598.02 123.2C602.4 123.2 606.4 124.07 610.01 125.81C613.63 127.55 616.64 129.99 619.05 133.11V96H637.81V195.96H620.52L620 185.65C617.5 189.49 614.26 192.51 610.29 194.69C606.3 196.88 601.86 197.97 596.95 197.97ZM601.5 181.09C604.89 181.09 607.93 180.2 610.61 178.41C613.29 176.62 615.41 174.19 616.98 171.11C618.54 168.03 619.33 164.52 619.33 160.59C619.33 156.66 618.55 153.15 616.98 150.07C615.42 146.99 613.29 144.55 610.61 142.77C607.93 140.98 604.89 140.09 601.5 140.09C598.1 140.09 595.07 140.98 592.39 142.77C589.71 144.56 587.59 146.99 586.02 150.07C584.46 153.15 583.67 156.66 583.67 160.59C583.67 164.52 584.45 168.03 586.02 171.11C587.58 174.19 589.7 176.63 592.39 178.41C595.07 180.2 598.11 181.09 601.5 181.09Z"
            fill={fillColor}
          />
        </g>
        <path
          d="M201 124.667C201 137.005 196.039 148.175 188.003 156.311L187.624 156.69C179.508 164.716 168.358 169.677 156.04 169.687V124.687H110.95V124.677C110.95 112.339 115.911 101.169 123.947 93.0331L155.98 61L188.003 93.0231C196.039 101.159 201 112.339 201 124.667Z"
          fill="#63D7E5"
        />
        <path
          d="M156.04 169.697V169.976C155.97 181.416 151.578 192.826 142.853 201.54C134.129 210.265 122.719 214.657 111.289 214.727H110.75C99.3108 214.657 87.9011 210.265 79.1866 201.54C70.4621 192.816 66.0699 181.406 66 169.976V169.437C66.0699 157.998 70.4621 146.588 79.1866 137.873C87.911 129.149 99.3208 124.757 110.75 124.687H110.96C110.96 137.015 115.921 148.185 123.957 156.321L124.336 156.7C132.472 164.736 143.642 169.697 155.98 169.697H156.04Z"
          fill="#6464F6"
        />
        <defs>
          <clipPath id="clip0">
            <rect
              width="365.82"
              height="101.97"
              fill={fillColor}
              transform="translate(272 96)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export { Logo }
