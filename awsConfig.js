// Miguel Francisco da Silva Sales e Victor Luiz Koba Batista

import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: "ASIAQADZQP332HAYT2JA",
    secretAccessKey: "q3zRbvjiF5R9oYOL0+kmBcKmLnsliRJvW0wTci4d",
    sessionToken: "IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIC3MQGyAAWc8/VUVHRtEAolmGecRSYD6tXT3eiCCU2vZAiEAyUCV45KE41fQZSxe/b/PbpnoJSujAqi34YBzpLptuK8qwQIIFBAAGgwwMDAyNTQ4MzY0NzEiDL/ur1+Oq7W2qbT7yiqeAg/DB0zC2Y/cYdBQbUFj34zJPuGE+8RA6YOYzQCOYg85hUIlLO8jPPF8e2KtiJm8PVHKTLrAyQhib/gtRIWM4e1zw5D9C2sMfviKpfHeCopqmBcsqiy/fiIwti8p4smxOMpyP/nGZL9cVanXtMSJqu6BNX56ALWxEBaLRAuYD94yW7Y3BxvWpXLWa95dOG1ACQrHM0hHquIzneVztYDTB916pRMK3Aa+Qhf3MIfR4g2xZZ/OLBOk3+R1H3HSLQcrU/ohnbgY0ry7NRX3e7TlbrvyTtl9jDHnvzc7/5hhqLBN8QRhYENNgwQtsRVkmI65qzONzo90pixXEE62hu+CRshD577pfO7ZXAwjlFLCrpbz5giB9beqS3fHnmsFggIw67WowAY6ngGaHHxLwUKWRtJHbA7ns3DCz2HRX9nKlBEYvhZDqRQkvOZ/0zcT21xx2/r/ho1IeMqScfdbHUZIw1cbI8qWOdBQPCxYcaSk/KunKktEoYMvdi1J1W5pxdiOVefMiQNjCSHawILTKVyycbX6KIn3rWFqmteAE84Fv3fRb8kMxoM3bDkJn8iSzzh2ylxe1V6QkjZgp0fnOlHw2JuvU8BQ7g==",
    regio: "us-east-1",
});

const s3 = new AWS.S3();

export default s3;